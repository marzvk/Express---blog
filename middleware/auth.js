const rateLimit = require('express-rate-limit');

// Limitar intentos de login (middleware correcto)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => {
        req.flash('error_msg', 'Demasiados intentos de login, intenta de nuevo más tarde');
        return res.redirect('/auth/login');
    }
});

// PROTEGER RUTAS (requiere estar logueado)
// ========================================
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Por favor inicia sesión para ver esto');
    res.redirect('/auth/login');
};

// VERIFICAR SI ES ADMIN
// ========================================
const ensureAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) return next();
    req.flash('error_msg', 'No tienes permisos para ver esta sección');
    res.redirect('/');
};

// REDIRIGIR SI YA ESTÁ LOGUEADO VA A POSTS NO CONTINUA
// ====================================================
const forwardAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    };
    res.redirect('/posts');
};


module.exports = {
    loginLimiter,
    ensureAuthenticated,
    ensureAdmin,
    forwardAuthenticated,
};


// const rateLimit = require('express-rate-limit');


// module.exports.ensureAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     req.flash('error_msg', 'Por favor inicia sesion para ver esto');
//     res.redirect('/auth/login');
// };


// // REDIRIGIR SI YA ESTÁ LOGUEADO VA A POSTS NO CONTINUA
// // ====================================================
// module.exports.forwardAuthenticated = (req, res, next) => {
//     if (!req.isAuthenticated()) {
//         return next();
//     };
//     res.redirect('/posts');
// };




// module.exports.ensureAdmin = (req, res, next) => {
//     if (req.isAuthenticated() && req.user.isAdmin) {
//         return next();
//     }
//     req.flash('error_msg', 'No tienes permisos para acceder');
//     res.redirect('/posts');
// };

// // MIDDLEWARE CONTROL INTENTOS DE LOGIN
// // ========================================

// const loginLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutos
//     max: 5, // máximo 5 intentos
//     standardHeaders: true,
//     legacyHeaders: false,
//     handler: (req, res, next) => {
//         req.flash('error_msg', 'Demasiados intentos de login, intenta de nuevo más tarde');
//         return res.redirect('/auth/login');
//     },
// });

// module.exports = { loginLimiter };
