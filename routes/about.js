var express = require('express');
var router = express.Router();

/* GET about */
router.get('/', function(req, res, next) {
  res.render('about', {
    title: 'Acerca del Proyecto',
    description: 'Este blog está dedicado a compartir noticias, análisis y reseñas de videojuegos,<br> creado con Express y Node.js para aprender su uso.'
  });
});

module.exports = router;
