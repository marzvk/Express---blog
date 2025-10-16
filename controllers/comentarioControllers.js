
const Comentario = require("../models/comentario");


exports.create_post = async (req, res, next) => {
    try {
        const { content } = req.body;
        const postId = req.params.postId;
        const userId = req.user._id; // Asumiendo que has implementado la autenticación con Passport y tienes req.user

        // 1. Crear la instancia del comentario
        const comentario = new Comentario({
            content: content,
            author: userId,
            post: postId
        });

        // 2. Guardar en MongoDB
        await comentario.save();

        // 3. Redirigir de vuelta a la página del post para ver el nuevo comentario
        // Usamos el ID del post para la redirección.
        res.redirect(`/posts/${postId}#comentario-${comentario._id}`); 
        // Nota: La redirección usa el ancla para saltar al nuevo comentario.

    } catch (err) {
        // Manejar errores de validación o DB
        res.render('post_detail', { 
             title: 'Error', 
             error: err,
             // ... pasa los datos necesarios para re-renderizar la página del post ...
        }); 
    }
};

exports.update_put = async (req, res, next) => {
    res.send('update')
}

exports.delete_delete = async (req, res, next) => {
    res.send('delete')
}