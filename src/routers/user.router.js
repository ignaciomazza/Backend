import { Router } from 'express';
// import session from 'passport';
import passport from 'passport';
import loadUser from '../middlewares/loadUser.js';
import { signUp, login, current } from '../controllers/user.controller.js'

const routerU = Router();

routerU.post(
  '/signup',
  passport.authenticate('register', { failureRedirect: '/failregister' }),
  signUp
);

routerU.post('/login', login);

routerU.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  loadUser,
  current
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
