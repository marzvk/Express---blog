

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    icono: { type: String, default: null },  // Usamos String para guardar la URL de la imagen
    descripcion: { type: String, maxlength: 100 },

    isAdmin: { type: Boolean, default: false }
}, { timestamps: true });  // mongoose crea automáticamente los campos createdAt y updatedAt

// crea modelo User basado en el userSchema
module.exports = mongoose.model('User', UserSchema);
