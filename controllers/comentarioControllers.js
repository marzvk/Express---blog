
const Comentario = require("../models/comentario");
const Post = require("../models/post");


exports.create_post = async (req, res, next) => {
    try {
        // hasta implementar auth user 
        const originalPost = await Post.findById(req.params.postId).exec();

        if (!originalPost) {
            const err = new Error("Post no encontrado");
            err.status = 404;
            return next(err);
        }

        const { content } = req.body;
        const { postId } = req.params;
        const userId = req.user._id; // usuario logueado

        // instancia del comentario
        const comentario = new Comentario({
            content: content,
            author: userId,
            post: postId
        });


        await comentario.save();
        res.redirect(`/posts/${postId}#comentario-${comentario._id}`);
        // La redirección usa el ancla para saltar al nuevo comentario.

    } catch (err) {
        // Manejar errores de validación o DB
        res.render('post_detail', {
            title: 'Error',
            error: err,

        });
    }
};

exports.update_put = async (req, res, next) => {
    const { postId, comentarioId } = req.params;
    const { content } = req.body;
}

exports.delete_delete = async (req, res, next) => {
    const { postId, comentarioId } = req.params;
}