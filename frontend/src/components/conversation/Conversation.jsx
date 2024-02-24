import React, { useState, useEffect } from "react";
import "./conversation.css";
import axios from "axios";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getUser = async () => {
      try {
        const friendId = conversation.members.find((m) => m !== currentUser._id);
        const res = await axios.get("https://we-connect-api-r7xb.onrender.com/api/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      {user && (
        <>
          <img
            src={user.profilePicture ? user.profilePicture : PF + "/person.jpg"}
            alt=""
            className="conversationImg"
          />
          <span className="conversationName">{user?.username}</span>
        </>
      )}
    </div>
  );
};

export default Conversation;
