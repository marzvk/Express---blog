var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { 
    title: 'Proyecto Blog de Videojuegos', 
    subtitle: 'Welcome to Express',
    description: 'Este es un blog de videojuegos creado con Node.js y Express.'
  });
});

module.exports = router;
