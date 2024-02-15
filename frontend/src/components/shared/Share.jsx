import "./share.css";
import PermMedia from "@mui/icons-material/PermMedia";
import Label from "@mui/icons-material/Label";
import Room from "@mui/icons-material/Room";
import EmojiEmotions from "@mui/icons-material/EmojiEmotions";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "./../../context/AuthContext";
import axios from "axios";
import Cancel from "@mui/icons-material/Cancel";

export const Share = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const desc = useRef();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.set("file", file, fileName);
      newPost.img = fileName;
      try {
        await axios.post("https://we-connect-api-r7xb.onrender.com/api/upload/", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("https://we-connect-api-r7xb.onrender.com/api/posts", newPost);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={user.profilePicture ? PF + user.profilePicture : PF + "/person.jpg"}
            className="shareProfileImg"
            alt=""
          />
          <input
            type="text"
            placeholder={"What's on your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img
              className="shareImg"
              style={{ width: "100%", maxHeight: "600px" }}
              src={URL.createObjectURL(file)}
              alt=""
            />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler} enctype="multipart/form-data">
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or video</span>
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="gold" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};
