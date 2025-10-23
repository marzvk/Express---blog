
const LocalStrategy = require('passport-local').Strategy;
// Estrategia local(email+pass)
const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: 'email' },
            // alguien intenta loguearse salta el callback(verifica si es correcto email y password)
            async (email, password, done) => {
                try {
                    const user = await User.findOne({ email: email });
                    if (!user) {
                        // done es termine: primer arg es error, o sea null si no hubo; seg es el
                        // usuario, false es que fallo
                        return done(null, false, { message: 'Credenciales incorrectas' });
                    }

                    // compara pass hasheado con bcrypt
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (!isMatch) {
                        return done(null, false, { message: 'Credenciales incorrectas' });
                    }

                    //  Login exitoso, done sin error, toma el usuario
                    return done(null, user);

                } catch (err) {
                    return done(err);
                }
            }
        )
    )
    // ========================================
    // SERIALIZACIÓN (Guardar en sesión)
    // Solo guarda el ID del usuario en la cookie seesion
    // ========================================
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // ========================================
    // DESERIALIZACIÓN (Recuperar de sesión en cada request que necesite req.user)
    // Recupera usuario usando el ID
    // ========================================
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });

};
