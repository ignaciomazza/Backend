import ProductManager from "../dao/classes/productManager.dao.js"
const pm = new ProductManager()

export const home = async (req, res) => {
    const listadeproductos = await pm.getProductsView()
    res.render("home", { listadeproductos })
}

export const realtimeproducts = (req, res) => {
    const { Profile } = req.session;
    res.render('realtimeproducts', { Profile });
}

export const chat = (req, res) => {
    res.render("chat")
}

export const login = (req, res) => {
    res.render('login');
}

export const signup = (req, res) => {
    res.render('signup');
}

export const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}
