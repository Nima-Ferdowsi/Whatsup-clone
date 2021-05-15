import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch } from "react-redux";
import { server } from "../../config/config.json";
import { newRooms } from "../../action/rooms";
import { getChat } from './../../action/chat';
import { reciverInfo } from './../../utils/chat';
import Pusher from 'pusher-js'
import { newMessage } from "../../action/chat";


const SideBarChats = (props) => {
  const dispatch = useDispatch();


  const name = reciverInfo('name',props.title,props);
  const chatId = reciverInfo('roomId',props.title,props);
const avatar= reciverInfo('avatar',props.title,props);
  const newRoom = async () => {
    if (props.types == "users") {
      const me = await JSON.parse(localStorage.getItem("user"));
      
      dispatch(
        newRooms({
          users: [
            { id: props.id, user: props.title,avatar:props.avatar },
            { id: me.result._id, user: me.result.firstname ,avatar:me.result.avatar },
          ],
        })
      );
      props.setOpen(true);
    }

    else{
      const roomId=reciverInfo('roomId',props.title,props)
      const userAvatar=reciverInfo('avatar',props.title,props)
      console.log(props.title);
      dispatch(getChat(roomId,reciverInfo('user',props.title,props),chatId))
      props.openChat()
    } 
  };

  const avatarLogic=()=>{
    if (props.types == "users") {
    
    return props.avatar
    }

    else{
     return avatar 
    }
  }

  return (
    <div
      id={chatId}
      key={chatId}
      className="sidebarChat"
      onClick={newRoom}
    >
      <Avatar alt={name} src={`${server}/uploads/${avatarLogic()}`} />
      <div className="sidebar-chats-info">
        <h2>{name}</h2>
        <p>This is the last message</p>
      </div>
    </div>
  );
};

export default SideBarChats;
