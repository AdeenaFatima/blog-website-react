import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Blogpost from "./components/Blogpost";
import Createpost from "./components/Createpost";

function BlogList({ posts }) {
  return (
    <section className="container mt-4">
      <h2 className="mb-4">Latest Posts</h2>

      {posts.length === 0 ? (
        <div className="alert alert-secondary">No posts yet. Create the first one!</div>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div key={post.id} className="col-lg-3 col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                {post.image && (
                  <img
                    src={post.image}
                    className="card-img-top"
                    alt={post.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{post.title}</h5>
                  <small className="text-muted mb-2">
                    By {post.author} — {post.createdAt}
                  </small>
                  <p className="card-text">
                    {post.content.slice(0, 100)}
                    {post.content.length > 100 ? "..." : ""}
                  </p>
                  <Link
                    to={`/posts/${post.id}`}
                    className="btn btn-outline-primary mt-auto"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "Exploring the Mountains",
      author: "Alex",
      content:
        "Traveling through the mountains is an amazing experience. The fresh air, the silence, and the beauty of nature make it unforgettable.",
      createdAt: "2025-09-20",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format"
    },
    {
      id: "2",
      title: "Delicious Food Recipes",
      author: "Elly",
      content:
        "Food brings people together. From spicy dishes to sweet desserts, let’s explore some exciting recipes that you can try at home.",
      createdAt: "2025-09-21",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format"
    },
    {
      id: "3",
      title: "Modern Design Trends",
      author: "Leris",
      content:
        "Design is all about creativity and innovation. In this post, we’ll look at modern UI/UX trends that make products stand out.",
      createdAt: "2025-09-22",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format"
    },
    {
      id: "4",
      title: "The Wonders of Science",
      author: "Sophia",
      content:
        "Science helps us understand the world better. From space exploration to medical breakthroughs, let’s dive into amazing scientific discoveries.",
      createdAt: "2025-09-23",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format"
    },
    {
      id: "5",
      title: "Gaming: More Than Fun",
      author: "Ryan",
      content:
        "Gaming is not just entertainment anymore. It’s a growing industry with esports, VR, and storytelling that rival blockbuster movies.",
      createdAt: "2025-09-24",
      image: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?w=800&auto=format" // 🎮 fixed gaming pic
    },
    {
      id: "6",
      title: "Home Decor Inspirations",
      author: "Maya",
      content:
        "Your home reflects your personality. From cozy minimalism to vibrant boho styles, here are some great decor ideas to inspire you.",
      createdAt: "2025-09-24",
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format"
    },
    {
      id: "7",
      title: "Healthy Lifestyle Tips",
      author: "David",
      content:
        "Living a healthy lifestyle is about balance—nutrition, exercise, and mindfulness. Let’s talk about small habits that bring big results.",
      createdAt: "2025-09-25",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format"
    },
    {
      id: "8",
      title: "Fitness for Everyone",
      author: "Nina",
      content:
        "Fitness isn’t about perfection. It’s about progress. Whether it’s yoga, running, or lifting, there’s a workout for everyone.",
      createdAt: "2025-09-25",
      image: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800&auto=format" 
    }
  ]);

  const addPost = (newPost) => {
    newPost.id = String(Date.now()); 
    newPost.createdAt = new Date().toISOString().slice(0, 10); 
    setPosts((prev) => [newPost, ...prev]); 
  };

  const deletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container flex-grow-1 mt-4">
        <Routes>
          <Route path="/" element={<BlogList posts={posts} />} />
          <Route
            path="/posts/:id"
            element={<Blogpost posts={posts} onDelete={deletePost} />}
          />
          <Route path="/create" element={<Createpost onCreate={addPost} />} />
          <Route
            path="*"
            element={
              <div className="alert alert-warning mt-3">
                404 — Page not found
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
