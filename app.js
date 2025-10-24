require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

var app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((error) => console.error('❌ Error MongoDB:', error));


require('./models/user');
require('./models/categoria');
require('./models/post');
require('./models/comentario');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



// ========================================
// CONFIGURACIÓN DE SESIONES
// ⚠️ DEBE IR ANTES DE PASSPORT
// ========================================
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: 'sessions',
      ttl: 24 * 60 * 60 // 24 horas sesion expìra en db
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 24 horas
    }
  })
);



// ========================================
// INICIALIZACIÓN DE PASSPORT
// ⚠️ ORDEN CRÍTICO:
// 1. express-session
// 2. passport.initialize()
// 3. passport.session()
// ========================================
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());



// ========================================
// CONNECT-FLASH (mensajes flash)
// ========================================
app.use(flash());

// ========================================
// VARIABLES GLOBALES PARA VISTAS
// ========================================
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null; // Usuario disponible en todas las vistas
  next();
});


// ========================================
// MIDDLEWARES GENERALES
// ========================================
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// method-override (usa el campo _method del body por defecto)
app.use(methodOverride('_method'));


// ========================================
// RUTAS
// ========================================
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var postsRouter = require('./routes/posts');
var loginRouter = require('./routes/auth');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/posts', postsRouter);
app.use('/auth', loginRouter);


// ========================================
// MANEJO DE ERRORES
// ========================================
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
