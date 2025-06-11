const fs = require("fs");
const path = require("path");

const postsFilePath = path.join(__dirname, "../data/posts.json");

function getAllPosts() {
  const posts = JSON.parse(fs.readFileSync(postsFilePath, "utf-8"));
  return posts;
}

function getPostById(id) {
  const posts = getAllPosts();
  return posts.find((post) => post.id === id);
}

function savePosts(posts) {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), "utf-8");
}

function addPost(newPost) {
  const posts = getAllPosts();

  const newId = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;
  const postToSave = { id: newId, ...newPost };

  posts.push(postToSave);
  savePosts(posts); // Usamos la función reutilizable

  return postToSave;
}

function deletePost(title) {
  const posts = getAllPosts();
  const filteredPosts = posts.filter((p) => p.title !== title);
  savePosts(filteredPosts);
  return filteredPosts;
}

module.exports = {
  getAllPosts,
  getPostById,
  addPost,
  deletePost,
};
