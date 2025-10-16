var express = require('express');

const post_controller = require("../controllers/postControllers");
const categoria_controller = require("../controllers/categoriaControllers");

var router = express.Router();

// Posts routes //

// GET req for list of all posts
router.get('/', post_controller.post_list);

// GET request for creating a post
router.get("/create", post_controller.post_create_get);

// POST request for creating a post
router.post("/create", post_controller.post_create_post);


//  CATEGORIA ROUTER - ANTES DE /:id  //

// Express lee las rutas de arriba hacia abajo. Si /:id está primero, captura /create 
// pensando que "create" es un ID, y nunca llega a la ruta específica /create.


// GET req for list of all categorias
router.get('/categorias', categoria_controller.categoria_list);

// GET req for creating categorias
router.get('/categorias/create', categoria_controller.categoria_create_get);

// POST req for creating categorias
router.post('/categorias/create', categoria_controller.categoria_create_post);

// Mostrar elementos de una categoria
router.get('/categorias/:id', categoria_controller.categoria_detail);

// DELETE categorias
router.get('/categorias/:id/delete', categoria_controller.categoria_delete_get);
router.post('/categorias/:id/delete', categoria_controller.categoria_delete_post);

// UPDATE categorias
router.get('/categorias/:id/update', categoria_controller.categoria_update_get);
router.post('/categorias/:id/update', categoria_controller.categoria_update_post);


//  POST ROUTES - /:id AL FINAL  //

// GET request for one post
router.get("/:id", post_controller.post_detail);

// DELETE post
router.get("/:id/delete", post_controller.post_delete_get);
router.post("/:id/delete", post_controller.post_delete_post);

// UPDATE post
router.get("/:id/update", post_controller.post_update_get);
router.post("/:id/update", post_controller.post_update_post);

module.exports = router;