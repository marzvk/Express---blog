

const Post = require("../models/post");
const Categoria = require("../models/categoria");
const Comentario = require("../models/comentario");
const user = require("../models/user");



// Lista de categorias
exports.categoria_list = async (req, res, next) => {
    const allCategorias = await Categoria.find({})
        .sort({ name: 1 })
        .exec();

    res.render("categoria_list", {
        title: "Categorias",
        categoria_list: allCategorias,
    });
};


// Detalle de categoria
exports.categoria_detail = async (req, res, next) => {
    try {
        const [categoria, postInCategoria] = await Promise.all([
            Categoria.findById(req.params.id).exec(),
            // lee el id de la categoria y asi lo pasa a post
            Post.find({ category: req.params.id }, "title").exec(),
        ]);

        if (categoria === null) {
            const err = new Error;
            err.status = 404;
            return next(err);
        }

        res.render("categoria_detail", {
            title: "Noticias de la Categoria",
            categoria,
            posts: postInCategoria,
        })
    } catch (err) {
        return next(err)
    };
};

exports.categoria_create_get = async (req, res, next) => {
    res.send("not implemented get")
}

exports.categoria_create_post = async (req, res, next) => {
    res.send("not implemented post")
}


// DELETE
exports.categoria_delete_get = async (req, res, next) => {
    try {
        const [categoria, postInCategoria] = await Promise.all([
            Categoria.findById(req.params.id).exec(),
            // lee el id de la categoria y asi lo pasa a post
            Post.find({ category: req.params.id }, "title").exec(),
        ]);

        if (!categoria) {
            res.redirect("/categorias")
            return;
        }

        res.render("categoria_delete", {
            title: "Delete Categoria",
            categoria,
            posts: postInCategoria,
        })
    } catch (error) {
        return next(error)
    }
}

exports.categoria_delete_post = async (req, res, next) => {
     try {
        const [categoria, postInCategoria] = await Promise.all([
            Categoria.findById(req.params.id).exec(),
            // lee el id de la categoria y asi lo pasa a post
            Post.find({ category: req.params.id }, "title").exec(),
        ]);

        if (postInCategoria.length > 0 ) {
            // hay posts en esta categoria
            res.render("categoria_delete", {
                title: "Delete Categoria",
                categoria,
                posts: postInCategoria,
                error: "No se puede eliminar una categoría que tiene posts.",
            });
            return;
        }

        await Categoria.findByIdAndDelete(req.params.id);
        res.redirect("/categorias");

    } catch (error) {
        return next(error)
    }
}

exports.categoria_update_get = async (req, res, next) => {
    res.send("not implemented update get")
}

exports.categoria_update_post = async (req, res, next) => {
    res.send("not implemented update post")
}