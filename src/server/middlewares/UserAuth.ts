const authClientMiddleware = (req, res, next) => {
    if (req.session && req.session.userId) {
        next();
    } else {
        // Voir l'action avec Alexis / A-t-on vraiment besoin d'un middleware ? 
        res.redirect('/login');
    }
};
  
// Exportez le middleware d'authentification
module.exports = authClientMiddleware;