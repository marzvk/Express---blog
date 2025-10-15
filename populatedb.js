#! /usr/bin/env node

// Script para poblar la base de datos del blog de videojuegos

require('dotenv').config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const User = require("./models/user");
const Categoria = require("./models/categoria");
const Post = require("./models/post");
const Comentario = require("./models/comentario");

const users = [];
const categorias = [];
const posts = [];
const comentarios = [];

const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));

async function main() {
  console.log("🚀 Iniciando población de la base de datos...");
  await mongoose.connect(mongoDB);
  console.log("✅ Conectado a MongoDB");
  
  await createUsers();
  await createCategorias();
  await createPosts();
  await createComentarios();
  
  console.log("🎉 Base de datos poblada exitosamente");
  mongoose.connection.close();
}

// ========== FUNCIONES DE CREACIÓN ==========

async function userCreate(index, username, password, email, icono, descripcion, isAdmin) {
  const userDetail = {
    username,
    password,
    email,
    isAdmin: isAdmin || false
  };
  
  if (icono) userDetail.icono = icono;
  if (descripcion) userDetail.descripcion = descripcion;

  const user = new User(userDetail);
  await user.save();
  users[index] = user;
  console.log(`✅ Usuario agregado: ${username}`);
}

async function categoriaCreate(index, name) {
  const categoria = new Categoria({ name });
  await categoria.save();
  categorias[index] = categoria;
  console.log(`✅ Categoría agregada: ${name}`);
}

async function postCreate(index, title, content, author, category, image) {
  const postDetail = {
    title,
    content,
    author,
    category
  };
  
  if (image) postDetail.image = image;

  const post = new Post(postDetail);
  await post.save();
  posts[index] = post;
  console.log(`✅ Post agregado: ${title}`);
}

async function comentarioCreate(index, content, author, post) {
  const comentario = new Comentario({
    content,
    author,
    post
  });
  
  await comentario.save();
  comentarios[index] = comentario;
  console.log(`✅ Comentario agregado en post: ${post.title}`);
}

// ========== CREACIÓN DE DATOS ==========

async function createUsers() {
  console.log("\n📝 Agregando usuarios...");
  await Promise.all([
    userCreate(
      0,
      "admin",
      "admin123",
      "admin@blogvideojuegos.com",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      "Administrador del blog de videojuegos",
      true
    ),
    userCreate(
      1,
      "gamer_pro",
      "password123",
      "gamerpro@email.com",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer",
      "Amante de los RPG y juegos de estrategia",
      false
    ),
    userCreate(
      2,
      "pixel_master",
      "password123",
      "pixelmaster@email.com",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=pixel",
      "Fan de los juegos retro y pixel art",
      false
    ),
    userCreate(
      3,
      "console_warrior",
      "password123",
      "consolewarrior@email.com",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=console",
      "Jugador de consola desde los 90s",
      false
    ),
    userCreate(
      4,
      "pc_master_race",
      "password123",
      "pcmaster@email.com",
      null,
      "PC gaming es el mejor gaming",
      false
    ),
  ]);
}

async function createCategorias() {
  console.log("\n📝 Agregando categorías...");
  await Promise.all([
    categoriaCreate(0, "RPG"),
    categoriaCreate(1, "Acción"),
    categoriaCreate(2, "Aventura"),
    categoriaCreate(3, "Estrategia"),
    categoriaCreate(4, "Deportes"),
    categoriaCreate(5, "Shooter"),
    categoriaCreate(6, "Indie"),
    categoriaCreate(7, "Multijugador"),
  ]);
}

async function createPosts() {
  console.log("\n📝 Agregando posts...");
  await Promise.all([
    postCreate(
      0,
      "Análisis: Elden Ring - La obra maestra de FromSoftware",
      "Elden Ring combina lo mejor de Dark Souls con un mundo abierto expansivo. La colaboración con George R.R. Martin ha creado una narrativa profunda y misteriosa. Los combates son desafiantes pero justos, y la exploración es recompensada constantemente. Un must-play para fans del género Souls-like.",
      users[0],
      categorias[0],
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800"
    ),
    postCreate(
      1,
      "God of War Ragnarök: El cierre épico de la saga nórdica",
      "Santa Monica Studio nos trae la conclusión de la historia de Kratos y Atreus en la mitología nórdica. Los gráficos son impresionantes, la historia es emotiva y el combate es fluido y satisfactorio. Una experiencia que no te puedes perder.",
      users[1],
      categorias[1],
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800"
    ),
    postCreate(
      2,
      "The Legend of Zelda: Tears of the Kingdom - Innovación en estado puro",
      "Nintendo vuelve a demostrar por qué es el rey de la innovación. La física del juego permite creatividad sin límites, y el mundo de Hyrule nunca se sintió tan vivo. Las nuevas habilidades de Link cambian completamente la forma de jugar.",
      users[2],
      categorias[2],
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800"
    ),
    postCreate(
      3,
      "Baldur's Gate 3: El renacimiento del RPG clásico",
      "Larian Studios ha creado uno de los mejores RPG de la década. Con miles de opciones de diálogo, combate por turnos estratégico y una libertad de elección sin precedentes. Cada decisión importa y cada partida es única.",
      users[1],
      categorias[0],
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800"
    ),
    postCreate(
      4,
      "Hades 2: La secuela que mejora lo imposible",
      "Supergiant Games vuelve con una secuela que expande el universo de Hades. Nuevos personajes, mecánicas mejoradas y el mismo arte hermoso que caracteriza al estudio. El roguelike perfecto.",
      users[3],
      categorias[6],
      null
    ),
    postCreate(
      5,
      "Top 10 juegos indie que debes jugar en 2024",
      "La escena indie está más viva que nunca. Desde metroidvanias hasta puzzle games innovadores, estos son los títulos que no puedes perderte este año. Incluye Hollow Knight: Silksong, Hades 2, y más.",
      users[0],
      categorias[6],
      null
    ),
    postCreate(
      6,
      "Counter-Strike 2: El nuevo rey de los shooters competitivos",
      "Valve finalmente lanza la secuela de CS:GO. Nuevo motor gráfico, físicas mejoradas y mapas rediseñados. La competitiva nunca se sintió tan bien.",
      users[4],
      categorias[5],
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800"
    ),
    postCreate(
      7,
      "Starfield: Explorando las estrellas con Bethesda",
      "El primer nuevo universo de Bethesda en 25 años. Miles de planetas por explorar, personalización profunda y una historia épica. Aunque tiene sus bugs típicos de Bethesda, la experiencia vale la pena.",
      users[2],
      categorias[2],
      null
    ),
  ]);
}

async function createComentarios() {
  console.log("\n📝 Agregando comentarios...");
  await Promise.all([
    comentarioCreate(
      0,
      "¡Totalmente de acuerdo! Elden Ring es una obra maestra absoluta. He dedicado más de 200 horas y sigo descubriendo cosas nuevas.",
      users[1],
      posts[0]
    ),
    comentarioCreate(
      1,
      "Me encantó la reseña. Estoy esperando a que baje de precio para comprarlo.",
      users[2],
      posts[0]
    ),
    comentarioCreate(
      2,
      "El juego es increíble pero demasiado difícil para mi gusto. ¿Algún consejo para principiantes?",
      users[3],
      posts[0]
    ),
    comentarioCreate(
      3,
      "God of War Ragnarök me hizo llorar. La relación entre Kratos y Atreus es hermosa.",
      users[2],
      posts[1]
    ),
    comentarioCreate(
      4,
      "GOTY 2024 sin duda. Santa Monica hizo un trabajo increíble.",
      users[4],
      posts[1]
    ),
    comentarioCreate(
      5,
      "Tears of the Kingdom superó todas mis expectativas. Nintendo nunca decepciona.",
      users[0],
      posts[2]
    ),
    comentarioCreate(
      6,
      "Llevo 150 horas y apenas he completado el 40% del juego. Es enorme!",
      users[3],
      posts[2]
    ),
    comentarioCreate(
      7,
      "Baldur's Gate 3 me recordó por qué amo los RPG. Obra maestra absoluta.",
      users[4],
      posts[3]
    ),
    comentarioCreate(
      8,
      "Hades 2 está en early access pero ya se siente más pulido que muchos juegos completos.",
      users[1],
      posts[4]
    ),
    comentarioCreate(
      9,
      "¡Excelente lista! Agregaría también Hollow Knight: Silksong cuando salga.",
      users[2],
      posts[5]
    ),
    comentarioCreate(
      10,
      "CS2 tiene algunos problemas de balance pero el potencial es enorme.",
      users[3],
      posts[6]
    ),
    comentarioCreate(
      11,
      "Starfield es bueno pero esperaba más. Bethesda necesita un nuevo motor gráfico.",
      users[1],
      posts[7]
    ),
  ]);
}