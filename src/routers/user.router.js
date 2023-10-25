import { Router } from 'express';
import { userModel } from '../dao/models/user.model.js';
// import session from 'passport';
import passport from 'passport';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import loadUser from '../middlewares/loadUser.js';

const routerU = Router();

routerU.post(
  '/signup',
  passport.authenticate('register', { failureRedirect: '/failregister' }),
  async (req, res) => {
    console.log(req.user);
    res.redirect('/login');
  }
);

routerU.post('/login', async (req, res) => {
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
);

routerU.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  loadUser,
  async (req, res) => {
    res.send(req.user);
  }
);

export default routerU;

// routerU.get(
//   '/github',
//   passport.authenticate('github', { scope: ['user:email'] })
// );

// routerU.get(
//   '/githubcallback',
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   function (req, res) {
//     req.session.user = req.user;
//     req.session.isLogged = true;
//     res.redirect('/realtimeproducts');
//   }
// );
