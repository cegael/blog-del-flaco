const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/posts.json');

const loadPosts = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]');
  }
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const savePosts = (posts) => {
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
};

const getPosts = (req, res) => {
  const posts = loadPosts();
  res.json(posts);
};

const addPost = (req, res) => {
  const { title, date, excerpt, content } = req.body;

  if (!title || !date || !excerpt || !content) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  const posts = loadPosts();

  const newPost = {
    id: Date.now(),
    title: title.trim(),
    date,
    excerpt: excerpt.trim(),
    content: content.trim()
  };

  posts.push(newPost);
  savePosts(posts);

  res.status(201).json({ message: 'Artículo creado con éxito', post: newPost });
};

module.exports = {
  getPosts,
  addPost
};
