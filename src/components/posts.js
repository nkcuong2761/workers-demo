import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const resp = await fetch(
        "https://my-worker.ckn006.workers.dev/api/posts"
      )
      let temp = await resp.json()
      const postsResp = temp.map(j => JSON.parse(j))
      console.log('postResp: ',postsResp);
      setPosts(postsResp)
    }

    getPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.title}>
          <div><span style={{fontWeight:'bold'}}>title:&nbsp;</span>{post.title}</div><br/>
          <div><span style={{fontWeight:'bold'}}>username:&nbsp;</span>{post.username}</div><br/>
          <div><span style={{fontWeight:'bold'}}>content:&nbsp;</span>{post.content}</div><br/>
          <br/>
        </div>
      ))}
    </div>
  );
};

export default Posts;
