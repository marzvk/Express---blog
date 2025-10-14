

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategoriaSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 60
    }
});

// La colección en MongoDB se llamará 'categorias' (Mongoose la pluraliza por defecto)
module.exports = mongoose.model('Categoria', CategoriaSchema);