import { Router } from 'express';
import publicRoutes from '../middlewares/publicRoutes.js';
import privateRoutes from '../middlewares/privateRoutes.js';

import { home, realtimeproducts, chat, login, signup, logout } from '../controllers/views.controller.js'

const routerV = Router()

routerV.get("/", home)

routerV.get("/realtimeproducts", privateRoutes, realtimeproducts)

routerV.get("/chat", chat)

routerV.get('/login', publicRoutes, login);

routerV.get('/signup', publicRoutes, signup);

routerV.get('/logout', logout);

export default routerV