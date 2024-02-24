import React, { useState, useContext, useEffect } from "react";
import "./message.css";
import { format } from "timeago.js";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Message = ({ message, own }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const user = useContext(AuthContext);
  const friendId = message.sender === user._id ? message.receiver : message.sender;
  const [friendProfile, setFriendProfile] = useState(PF + "person.jpg");

  const findFriendProfile = async () => {
    const res = await axios.get("https://we-connect-api-r7xb.onrender.com/api/users?userId=" + friendId);
    setFriendProfile(PF + res.profilePicture);
  };

  useEffect(() => {
    findFriendProfile();
  }, []);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src={own ? (user.profilePicture ? PF + user.profilePicture : PF + "person.jpg") : friendProfile}
          alt=""
          className="messageImg"
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
