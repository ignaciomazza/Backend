const publicRoutes = (req, res, next) => {
    if (req.session.isLogged) {
        return res.redirect('/realtimeproducts');
    }
    next();
};

export default publicRoutes;