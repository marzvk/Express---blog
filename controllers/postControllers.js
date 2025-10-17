const { body, validationResult } = require("express-validator");

const Post = require("../models/post");
const Categoria = require("../models/categoria");
const Comentario = require("../models/comentario");
const user = require("../models/user");


// Lista de todos los posts
exports.post_list = async (req, res, next) => {
    const allPosts = await Post.find({})
        .sort({ createdAt: -1 })
        .populate("category")
        .populate("author", "username")
        .exec();

    res.render("post_list", {
        title: "Posts del Blog",
        post_list: allPosts
    });
};

// Detalle de cada post
exports.post_detail = async (req, res, next) => {
    try {
        const postId = req.params.postId;

        const post = await Post.findById(postId)
            .populate('author', 'username')
            .populate('category', 'name')
            .exec();

        const comentarios = await Comentario.find({
            post: postId
        })
            .populate('author', 'username icono')
            .sort({ createdAt: -1 })
            .exec();

        if(!post) {
            const err = new Error('Post no encontrado');
            err.status = 404;
            return next(err);
        }

        res.render('post_detail', {
            title: post.title,
            post: post,
            comentarios: comentarios,
            user: req.user
        });

    } catch(err) {
        next(err);
    }

};

// En el GET cargas los datos necesarios para mostrar el formulario, 
// y en el POST procesas lo que el usuario envió.

// GET - Mostrar formulario de crear post
exports.post_create_get = async (req, res, next) => {
    // Cargar datos necesarios para el formulario
    const categorias = await Categoria.find().sort({ name: 1 }).exec();
        
    // Si solo admins pueden crear posts:
    // const autores = await User.find({ isAdmin: true }).exec();

    if (categorias === null) {
        const err = new Error('categoria not found');
        err.status = 404;
        return next(err);
    }

    res.render("post_form", {
        title: "Create Post",
        categorias,
    });
};

// POST - Procesar el formulario
exports.post_create_post = [
    // Validación con express-validator
    body('title', 'El título es requerido')
        .trim()
        .isLength({ min: 1, max: 100 })
        .escape(),
    body('content', 'El contenido es requerido')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('category', 'La categoría es requerida')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('image')
        .optional({ checkFalsy: true })
        .trim()
        .isURL()
        .withMessage('Debe ser una URL válida'),

    async (req, res, next) => {
        const errors = validationResult(req);

        // Crear objeto Post con los datos del formulario
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.user._id, // Del usuario logueado
            category: req.body.category,
            image: req.body.image || null
        });

        if (!errors.isEmpty()) {
            // Hay errores - volver a mostrar el formulario
            const categorias = await Categoria.find().sort({ name: 1 }).exec();
            
            res.render('post_form', {
                title: 'Crear Post',
                categorias: categorias,
                post: post, // Para mantener los datos ingresados
                errors: errors.array()
            });
            return;
        }

        // No hay errores - guardar
        await post.save();
        res.redirect(post.url);
    }
];

exports.post_delete_get = async (req, res, next) => {
    res.send("not implemented delete get")
}

exports.post_delete_post = async (req, res, next) => {
    res.send("not implemented delete post")
}

exports.post_update_get = async (req, res, next) => {
    res.send("not implemented update get")
}

exports.post_update_post = async (req, res, next) => {
    res.send("not implemented update post")
}

