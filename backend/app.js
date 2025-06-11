// Importamos módulos necesarios
const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const postModel = require("./models/postModel");

const app = express();

// Middlewares
app.use(cors()); // Permite peticiones desde otros orígenes
app.use(express.json()); // Permite recibir JSON en el body
app.use(express.static(path.join(__dirname, "../public"))); // Sirve archivos estáticos desde /public

// Ruta para obtener todos los artículos
app.get("/api/posts", (req, res) => {
  const posts = postModel.getAllPosts(); // usa la función centralizada
  res.json(posts);
});

// Ruta para obtener un artículo por ID
app.get("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = postModel.getPostById(id);

  if (!post) {
    return res.status(404).json({ error: "Artículo no encontrado" });
  }

  res.json(post);
});

// Ruta para agregar un nuevo artículo
app.post("/api/posts", (req, res) => {
  const { title, date, excerpt, content } = req.body;

  // Validación simple
  if (!title || !date || !excerpt || !content) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const newPost = postModel.addPost({ title, date, excerpt, content });

  res.status(201).json({
    message: "Artículo creado con éxito",
    post: newPost,
  });
});

// Ruta para eliminar un artículo por ID
app.delete("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = postModel.deletePostById(id);

  if (!deleted) {
    return res.status(404).json({ error: "Artículo no encontrado" });
  }

  res.json({ message: "Artículo eliminado correctamente" });
});

// Servidor escuchando
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

