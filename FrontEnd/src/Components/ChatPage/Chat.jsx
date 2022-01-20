import React, { useEffect, useRef, useState } from "react";
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
import { server } from "../../config/config.json";
import { getChat, clearChatState } from "./../../Rx/action/chat";
import DropDown from "./../common/dropdown/DropDown";
import DropDownItem from "./../common/dropdown/DropDownItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SendIcon from "@material-ui/icons/Send";

const Chat = (props) => {
  const msg = useSelector((state) => state.chat);
 const theme=useSelector((state)=>state.theme);
  const [anchorEl, setAnchorEl] = useState(null);
  const { myRooms, setMyRooms } = props;
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };
  const chatRef = useRef(null);

  //get login user id
  const userID = getLocal("user").result._id;

  const dispatch = useDispatch();

  let name;
  let avatar;
  if (typeof msg.contact !== "undefined") {
    name = msg.contact.user;
    avatar = msg.contact.avatar;
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
    channel.bind("inserted", () => {
      dispatch(getChat(msg.room, msg.contact, msg.room));
    });
    channel.bind("deleted", () => {
      dispatch(getChat(msg.room, msg.contact, msg.room));
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [msg]);

  const Removeroom = async () => {
    const req = await fetch(`${server}/rooms/delete-room`, {
      method: "POST",
      body: JSON.stringify({ roomId: msg.room }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(clearChatState());
        const data = myRooms.filter((elem) => elem[0].roomId !== msg.room);
        setMyRooms(data);
        props.closeChat()
        closeMenu()
      })
      .catch((err) => console.log(err));
  };
  //message text type:(reciver or sender)
  const cheackMessage = (elem) => {
    if (userID === elem.messages.from.id) {
      return (
        <ChatMessage
          id={elem._id}
          messageClass="chat-reciever"
          txt={elem.messages.txt}
          name={elem.messages.from.name}
        />
      );
    } else {
      return (
        <ChatMessage
          id={elem._id}
          txt={elem.messages.txt}
          name={elem.messages.from.name}
        />
      );
    }
  };

  return (
    <div className="chat" ref={props.chatRef}>
      <div className={` ${theme.color} chat-header`}>
        <div className="back-icon">
          <ArrowBackIcon onClick={props.closeChat} />
        </div>
        <Avatar src={`${server}/uploads/${avatar}`} alt={name} />
        <div className="chat-header-info">
          <h3>{name}</h3>
          <p>last seean at...</p>
        </div>
        <div className="chat-header-right">
          <IconButton className={theme.color}>
            <SearchIcon />
          </IconButton>

          <IconButton className={theme.color}>
            <AttachFileIcon />
          </IconButton>

          <IconButton className={theme.color} style={{position:'relative'}}>
            <MoreVertIcon style={{position:'absolute'}} onClick={openMenu} />
            <DropDown
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={closeMenu}
            >
              <DropDownItem
                style={{ backgroundColor: "red" }}
                onClick={() => Removeroom()}
              >
                <ListItemIcon>
                  <SendIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Delete Chat" />
              </DropDownItem>
            </DropDown>
          </IconButton>
        </div>
      </div>
      <div className={`${theme.color} chat-body `} ref={chatRef}>
        {typeof msg.contact !== "undefined" ? (
          <Fragment>{messages.map((elem) => cheackMessage(elem))}</Fragment>
        ) : null}
      </div>
      <ChatFooter />
    </div>
  );
};

export default Chat;
