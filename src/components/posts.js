import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const resp = await fetch(
        "https://my-worker.ckn006.workers.dev/api/posts"
      )
      const postsResp = await resp.json()
      setPosts(postsResp)
    }

    getPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div>
          <h2>
            {post.name}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default Posts;
