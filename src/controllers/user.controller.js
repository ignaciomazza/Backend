import { userModel } from '../dao/models/user.model.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    console.log(req.user);
    res.redirect('/login');
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(401).send('Tu cuenta no existe');
    }
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).send('Contraseña equivocada')
    }
    const userId = user._id;
    const token = jwt.sign({ userId }, 'secreto', { expiresIn: '24h' })
    res.cookie('token', token, {
        maxAge: 1000000,
        httpOnly: true,
    })
        .send('Estas logeado');
}

export const current = async (req, res) => {
    res.send(req.user);
}