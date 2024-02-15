import React from "react";
import "./feed.css";
import { useState, useEffect, useContext } from "react";
import { Share } from "../shared/Share";
import Post from "../post/Post";
import axios from "axios";
import { AuthContext } from "./../../context/AuthContext";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = username
        ? await axios.get("https://we-connect-api-r7xb.onrender.com/api/posts/profile/" + username)
        : await axios.get("https://we-connect-api-r7xb.onrender.com/api/posts/timeline/" + user._id);
      setPosts(
        response.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Feed;
