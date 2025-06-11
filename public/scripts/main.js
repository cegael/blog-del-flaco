// Mostrar posts en blog.html
if (window.location.pathname.includes("blog.html")) {
  const postsContainer = document.getElementById("blog-posts");

  if (postsContainer) {
    fetch("http://localhost:3000/api/posts")
      .then((res) => {
        if (!res.ok) throw new Error("No se pudieron cargar los posts");
        return res.json();
      })
      .then((posts) => {
        postsContainer.innerHTML = "";
        posts.forEach((post) => {
          const postEl = document.createElement("article");
          postEl.innerHTML = `
            <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
            <small>${post.date}</small>
            <p>${post.excerpt}</p>
          `;
          postsContainer.appendChild(postEl);
        });
      })
      .catch((err) => {
        postsContainer.innerHTML = "<p>Error al cargar los artículos.</p>";
        console.error("Error cargando posts:", err);
      });
  } else {
    console.warn("No se encontró el contenedor #blog-posts");
  }
}

// Formulario para agregar artículo
const form = document.getElementById("postForm");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      title: form.title.value,
      date: form.date.value,
      excerpt: form.excerpt.value,
      content: form.content.value,
    };

    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al publicar el artículo");

      const result = await res.json();
      console.log("Artículo creado:", result);
      alert("✅ Artículo publicado correctamente");
      form.reset();
    } catch (error) {
      console.error(error);
      alert("❌ Ocurrió un error al publicar el artículo.");
    }
  });
}

// Mostrar artículo completo en post.html
if (window.location.pathname.includes("post.html")) {
  const postContainer = document.getElementById("post-content");

  if (postContainer) {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("id");

    if (!postId) {
      postContainer.innerHTML = "<p>ID de artículo no especificado.</p>";
    } else {
      fetch(`http://localhost:3000/api/posts/${postId}`)
        .then((res) => {
          if (!res.ok) throw new Error("No se encontró el artículo");
          return res.json();
        })
        .then((post) => {
          postContainer.innerHTML = `
            <article>
              <h1>${post.title}</h1>
              <small>${post.date}</small>
              <p>${post.content}</p>
            </article>
          `;
        })
        .catch((err) => {
          postContainer.innerHTML = "<p>Error al cargar el artículo.</p>";
          console.error(err);
        });
    }
  } else {
    console.warn("No se encontró el contenedor #post-content");
  }
}

// Mostrar últimos artículos en index.html
if (window.location.pathname.includes("index.html")) {
  const homePosts = document.getElementById("home-posts");

  if (homePosts) {
    fetch("http://localhost:3000/api/posts")
      .then((res) => {
        if (!res.ok) throw new Error("No se pudieron cargar los posts");
        return res.json();
      })
      .then((posts) => {
        const latestPosts = posts.slice(-3).reverse();
        latestPosts.forEach((post) => {
          const el = document.createElement("article");
          el.innerHTML = `
            <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
            <small>${post.date}</small>
            <p>${post.excerpt}</p>
          `;
          homePosts.appendChild(el);
        });
      })
      .catch((err) => {
        console.error("Error cargando artículos:", err);
      });
  } else {
    console.warn("No se encontró el contenedor #home-posts");
  }
}

