import { Router } from 'express';
import { userModel } from '../dao/models/user.model.js';

const routerU = Router();

function userRol (email, password) {
    if (email == 'adminCoder@coder.com' && password == 'adminCod3r123') {
      return 'admin';
    }else{
      return 'user';
    }
}

routerU.post('/signup', async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  const userExists = await userModel.findOne({ email });

  const rol = await userRol(email, password)

  if (userExists) {
    return res.send('Ya estás registrado');
  }

  const user = await userModel.create({
    first_name,
    last_name,
    email,
    age,
    password,
    rol,
  });

  req.session.first_name = first_name;
  req.session.last_name = last_name;
  req.session.email = email;
  req.session.age = age;
  req.session.rol = rol;
  req.session.isLogged = true;

  res.redirect('/realtimeproducts');
});

routerU.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, password }).lean();

  if (!user) {
    return res.send('Tus credenciales no son correctas');
  }

  req.session.first_name = user.first_name;
  req.session.last_name = user.last_name;
  req.session.email = user.email;
  req.session.age = user.age;
  req.session.rol = user.rol;
  req.session.isLogged = true;

  console.log(req.session)

  res.redirect('/realtimeproducts');
});

export default routerU;