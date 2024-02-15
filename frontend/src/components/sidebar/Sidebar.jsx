import React from "react";
import "./sidebar.css";
import RssFeed from "@mui/icons-material/RssFeed";
import Chat from "@mui/icons-material/Chat";
import Video from "@mui/icons-material/OndemandVideo";
import Group from "@mui/icons-material/Group";
import Bookmark from "@mui/icons-material/Bookmark";
import Question from "@mui/icons-material/HelpOutline";
import Job from "@mui/icons-material/WorkOutline";
import Event from "@mui/icons-material/Event";
import Course from "@mui/icons-material/School";
import { Users } from "../../dummyData";
import CloseFriend from "../../components/closeFriend/CloseFriend";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chat</span>
          </li>
          <li className="sidebarListItem">
            <Video className="sidebarIcon" />
            <span className="sidebarListItemText">Video</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Group</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmark</span>
          </li>
          <li className="sidebarListItem">
            <Question className="sidebarIcon" />
            <span className="sidebarListItemText">Question</span>
          </li>
          <li className="sidebarListItem">
            <Job className="sidebarIcon" />
            <span className="sidebarListItemText">Job</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Event</span>
          </li>{" "}
          <li className="sidebarListItem">
            <Course className="sidebarIcon" />
            <span className="sidebarListItemText">Course</span>
          </li>
        </ul>
        <button className="sidebarButton">Show more</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((user) => {
            return <CloseFriend id={user.id} user={user}></CloseFriend>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
