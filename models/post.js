

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: { type: String, required: true, maxlength: 100 },
    content: { type: String, required: true },

    // type: ObjectId almacena la referencia al documento User
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    category: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
    image: { type: String, default: null },
}, {timestamps: true});

module.exports = mongoose.model('Post', PostSchema);

