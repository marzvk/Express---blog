var express = require('express');
var router = express.Router();

const login_controller = require("../controllers/loginControllers");


// LOGIN ROUTES  //

// Get for login, mostrar formulario
router.get('/', login_controller.login_get);

// Post for login, procesar formulario login
router.post('/', login_controller.login_post);

//  Logout
router.post('/logout', login_controller.logout);

// ========== REGISTER ROUTES ========== //

// GET - Mostrar formulario de registro
router.get('/register', login_controller.register_get);

// POST - Procesar registro
router.post('/register', login_controller.register_post);


module.exports = router;
