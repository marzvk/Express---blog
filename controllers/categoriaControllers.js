const { body, validationResult } = require("express-validator");

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


// CREATE
exports.categoria_create_get = async (req, res, next) => {
    const categorias = await Categoria.find().sort({ name: 1 }).exec();

    if (!categorias) {
        const err = new Error("No existen categorias");
        err.status = 404;
        return next(err);
    }

    res.render("categoria_form", {
        title: "Create Categoria",
        categorias,
    });
};

exports.categoria_create_post = [
    body('name', 'El nombre es requerido')
        .trim()
        .isLength({ min: 1, max: 60 })
        .withMessage('El nombre debe tener entre 1 y 60 caracteres')
        .escape(),

    async (req, res, next) => {
        const errors = validationResult(req);

        // Crear objeto categoria
        const categoria = new Categoria({
            name: req.body.name,
        });

        if (!errors.isEmpty()) {
            // hay errores vuelve a mostrar form
            const categorias = await Categoria.find().sort({ name: 1 }).exec();

            res.render("categoria_form", {
                title: "Create Categoria",
                categorias,
                categoria,
                errors: errors.array(),
            });
            return;
        }

        await categoria.save();
        res.redirect(categoria.url)
    }];


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

        if (postInCategoria.length > 0) {
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