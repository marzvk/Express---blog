

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
        const post = await Post.findById(req.params.id)
            .populate('author', 'username')
            .populate('category', 'name')
            .exec();

        const comentarios = await Comentario.find({
            post: req.params.id
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

    } catch {
        next(err);
    }

};

exports.post_create_get = async (req, res, next) => {
    res.send("not implemented get")
}

exports.post_create_post = async (req, res, next) => {
    res.send("not implemented post")
}

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

