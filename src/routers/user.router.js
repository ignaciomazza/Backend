import { Router } from 'express';
import { userModel } from '../dao/models/user.model.js';
import passport from 'passport';

const routerU = Router();

routerU.post(
  '/signup',
  passport.authenticate('register', { failureRedirect: '/failregister' }),
  async (req, res) => {
    console.log(req.user);
    res.redirect('/realtimeproducts');
  }
);

routerU.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/faillogin' }),
  async (req, res) => {
    req.session.first_name = req.user.first_name;
    req.session.last_name = req.user.last_name;
    req.session.email = req.user.email;
    req.session.age = req.user.age;
    req.session.rol = req.user.rol;
    req.session.isLogged = true;

    res.redirect('/realtimeproducts');
  }
);

routerU.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

routerU.get(
  '/githubcallback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    req.session.user = req.user;
    req.session.isLogged = true;
    res.redirect('/realtimeproducts');
  }
);

export default routerU;