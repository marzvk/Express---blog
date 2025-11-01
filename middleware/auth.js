const rateLimit = require('express-rate-limit');

// PROTEGER RUTAS (requiere estar logueado)
// ========================================
module.exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Por favor inicia sesion para ver esto');
    res.redirect('/auth/login');
};


// REDIRIGIR SI YA ESTÁ LOGUEADO VA A POSTS NO CONTINUA
// ====================================================
module.exports.forwardAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    };
    res.redirect('/posts');
};



// VERIFICAR SI ES ADMIN
// ========================================
module.exports.ensureAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin) {
        return next();
    }
    req.flash('error_msg', 'No tienes permisos para acceder');
    res.redirect('/posts');
};

// MIDDLEWARE CONTROL INTENTOS DE LOGIN
// ========================================
module.exports.loginLimiter = (req, res) => {
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutos
        max: 5, // máximo 5 intentos
    })
    req.flash('error_msg', 'Demasiados intentos de login, intenta de nuevo más tarde'),
    res.redirect('/posts')
}
