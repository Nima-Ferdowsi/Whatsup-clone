import React, { useEffect, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatMessage from "./ChatMessage";
import ChatFooter from "./ChatFooter";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Fragment } from "react";
import { getLocal } from "../../utils/localstorage";
import Pusher from "pusher-js";
import { getChat } from "./../../action/chat";
const Chat = (props) => {
  const msg = useSelector((state) => state.chat);

  const userID = getLocal("user").result._id;
  const dispatch = useDispatch();
  let name;
  if (typeof msg.contact !== "undefined") {
    name = msg.contact.user;
  } else {
    name = "Room";
  }

  let messages = [];
  if (typeof msg.res !== "undefined" && msg.length !== 0) {
    msg.res.result.map((elem) => {
      messages.push(elem);
    });
  } else {
    messages = [];
  }

  useEffect(() => {
    var pusher = new Pusher("f1aaf06bf13b9df96407", {
      cluster: "eu",
    });

    var channel = pusher.subscribe("Message");
    channel.bind("inserted", function (data) {
      console.log(data.message);

      console.log(msg);
      dispatch(getChat(msg.room, msg.contact, msg.room));
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [msg]);

  //message text type:(reciver or sender)
  const cheackMessage = (elem) => {
    if (userID === elem.messages.from.id) {
      return (
        <ChatMessage messageClass="chat-reciever" txt={elem.messages.txt} />
      );
    } else {
      return <ChatMessage txt={elem.messages.txt} />;
    }
  };

  return (
    <div className="chat" ref={props.chatRef}>
      <div className="chat-header">
        <div className="back-icon">
          <ArrowBackIcon onClick={props.closeChat} />
        </div>
        <Avatar />
        <div className="chat-header-info">
          <h3>{name}</h3>
          <p>last seean at...</p>
        </div>
        <div className="chat-header-right">
          <IconButton>
            <SearchIcon />
          </IconButton>

          <IconButton>
            <AttachFileIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat-body">
        {typeof msg.contact !== "undefined" ? (
          <Fragment>{messages.map((elem) => cheackMessage(elem))}</Fragment>
        ) : null}
      </div>
      <ChatFooter />
    </div>
  );
};

export default Chat;
