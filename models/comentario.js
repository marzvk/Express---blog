

const mongoose = require('mongoose')
const { post } = require('../routes')
const Schema = mongoose.Schema

// Define los comentarios con referencias al User y al Post.
const ComentarioSchema = new Schema({
    content: { type: String, required: true, maxlength: 240 },

    // **RELACIÓN FOREIGN KEY A USER**
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    // **RELACIÓN FOREIGN KEY A POST**
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
}, {timestamps: true});

module.exports = mongoose.model('Comentario', ComentarioSchema);

