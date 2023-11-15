import { userModel } from '../dao/models/user.model.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
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
        .redirect("/api/user/current")
}

export const current = async (req, res) => {
    const userDTO = {
        User: `${req.user.first_name} ${req.user.last_name}`,
        Email: req.user.email,
        Age: req.user.age,
        Rol: req.user.role
    }

    req.session.Profile = userDTO
    req.session.isLogged = true

    res.redirect('/realtimeproducts')
}