var express = require('express');

const post_controller = require("../controllers/postControllers");
const categoria_controller = require("../controllers/categoriaControllers");
const comentario_controller = require("../controllers/comentarioControllers");


var router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');

// Posts routes //

// GET req for list of all posts
router.get('/', post_controller.post_list);

// GET request for creating a post
router.get("/create", ensureAuthenticated, post_controller.post_create_get);

// POST request for creating a post
router.post("/create", ensureAuthenticated, post_controller.post_create_post);


//  CATEGORIA ROUTER - ANTES DE /:id  //

// Express lee las rutas de arriba hacia abajo. Si /:id está primero, captura /create 
// pensando que "create" es un ID, y nunca llega a la ruta específica /create.


// GET req for list of all categorias
router.get('/categorias', categoria_controller.categoria_list);

// GET req for creating categorias
router.get('/categorias/create',ensureAuthenticated, categoria_controller.categoria_create_get);

// POST req for creating categorias
router.post('/categorias/create',ensureAuthenticated, categoria_controller.categoria_create_post);

// Mostrar elementos de una categoria
router.get('/categorias/:id', categoria_controller.categoria_detail);

// DELETE categorias
router.get('/categorias/:id/delete', ensureAdmin, categoria_controller.categoria_delete_get);
router.post('/categorias/:id/delete', ensureAdmin, categoria_controller.categoria_delete_post);

// UPDATE categorias
router.get('/categorias/:id/update', categoria_controller.categoria_update_get);
router.post('/categorias/:id/update', categoria_controller.categoria_update_post);



//  * * * COMENTARIOS ROUTE  * * *   //

//Post comentario
router.post("/:postId/comentarios", comentario_controller.create_post);

// Update comentario get
router.get("/:postId/comentarios/:comentarioId/update", ensureAuthenticated, comentario_controller.update_get);
// Update comentario post
router.post("/:postId/comentarios/:comentarioId/update", ensureAuthenticated, comentario_controller.update_post);

// Delete comentario
router.post("/:postId/comentarios/:comentarioId/delete", ensureAuthenticated, comentario_controller.delete_post);



//  POST ROUTES - /:id AL FINAL  //

// GET request for one post
router.get("/:postId", post_controller.post_detail);

// DELETE post
router.get("/:postId/delete", ensureAdmin, post_controller.post_delete_get);
router.post("/:postId/delete", ensureAdmin, post_controller.post_delete_post);

// UPDATE post
router.get("/:postId/update", ensureAuthenticated, post_controller.post_update_get);
router.post("/:postId/update", ensureAuthenticated, post_controller.post_update_post);

module.exports = router;