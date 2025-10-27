var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Comentario = require('../models/comentario');

// 👤 Perfil del usuario logueado
router.get('/profile', async function (req, res, next) {
  try {
    const user = req.user;
    if (!user) {
      return res.redirect('/auth/login');
    }

    // Traer los comentarios del usuario
    const comentarios = await Comentario.find({ author: user._id })
      .populate('post', 'title') 
      .sort({ createdAt: -1 })
      .exec();

    res.render('user_profile', {
      title: 'Tu perfil',
      user,
      comentarios
    });
  } catch (error) {
    next(error);
  }
});

// 🧍 Perfil público de otro usuario
router.get('/:userId', async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const usuario = await User.findById(userId).lean();

    if (!usuario) {
      req.flash('error_msg', 'Usuario no encontrado');
      return res.redirect('/posts');
    }

    res.render('user_info', {
      title: `Perfil de ${usuario.username}`,
      usuarioVisitado: usuario,
      user: req.user || null,
    });
  } catch (error) {
    next(error);
  }
});


// PROFILE , EDIT PROFILE
module.exports = router;
