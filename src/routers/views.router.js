import { Router } from 'express';
import ProductManager from "../dao/managers/productManagerMongo.js"
import publicRoutes from '../middlewares/publicRoutes.js';
import privateRoutes from '../middlewares/privateRoutes.js';
const pm = new ProductManager()

const routerV = Router()

routerV.get("/", async (req, res) => {
    const listadeproductos = await pm.getProductsView()
    res.render("home", { listadeproductos })
})

routerV.get("/realtimeproducts", privateRoutes,(req, res) => {
  const { first_name, last_name, email, age, rol } = req.session;
  res.render('realtimeproducts', { first_name, last_name, email, age, rol });
})

routerV.get("/chat", (req, res) => {
    res.render("chat")
})

routerV.get('/login', publicRoutes,(req, res) => {
    res.render('login');
});

routerV.get('/signup', publicRoutes,(req, res) => {
    res.render('signup');
});

routerV.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

export default routerV