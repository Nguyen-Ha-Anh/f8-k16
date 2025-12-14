import { useEffect, useState } from "react";
import { instance } from "./utils/axios";

export default function FetchAPI() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const [sowModal, setShowModal] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      // const response = await instance.get(`/posts`);
      // setPosts(response.data.posts);
      try {
        const response = await instance.get(`/posts`);
        setPosts(response.data.posts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  const handleDetail = async (id) => {
    setShowModal(true);
    const response = await instance.get(`/posts/${id}`);
    setPost(response.data   )
  }
  return (
    <div>
      <h1>Posts</h1>
      {isLoading ? (
        <h2>Loading..</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        posts.map((post) => {
          return <h2 key={post.id}>{post.title} {''}
          <button onClick={() => handleDetail(post.id)}>Chi tiet</button>
          </h2>;
        })
      )}
    </div>
  );
}

// data, err, loading
