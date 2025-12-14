import "./App.css";
import { useEffect, useState } from "react";

const tabs = ["posts", "comments", "albums"];

function App() {
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState('posts');

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, []);
  return (
    <>
      {tabs.map((tab) => (
        <button 
        key={tab}
        style={type === tab ? {
          color: '#fff',
          background: '#333',
        } : {}
      }
        onClick={() => setType(tab)}>{tab}</button>
      ))}
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
