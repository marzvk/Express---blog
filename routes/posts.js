var express = require('express');

const post_controller = require("../controllers/postControllers");
const categoria_controller = require("../controllers/categoriaControllers");

var router = express.Router();

// Posts routes //

// GET req for list of all posts
router.get('/', post_controller.post_list );

// GET request for one post
router.get("/:id", post_controller.post_detail);



module.exports = router;