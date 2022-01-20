import React, { Fragment, useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router";
import { getLocal } from "../utils/localstorage";
import Chat from "../Components/ChatPage/Chat";
import Sidebar from "../Components/ChatPage/SideBar";
import { useSelector } from 'react-redux';

const ChatPage = () => {
  const theme = useSelector((state) => state.theme);

  // state for myrooms
  const [myRooms, setMyRooms] = useState([]);
  //window width
  const [getWidth, setWidth] = useState(window.innerWidth);
  const user=getLocal('user')

  const chatRef = useRef(null);
  const chatListRef = useRef(null);
  const addChatBtn = useRef(null);

  const openChatList = () => {
    chatListRef.current.style.flex = "1";
    chatListRef.current.style.right = "0";
    chatListRef.current.style.width = "100vw";
    addChatBtn.current.style.display='block'
  };
  const closeChat = () => {
    
    if (getWidth <= 700) {
      chatRef.current.style.left = "1000px";
      chatRef.current.style.flex = "0";
  
      chatRef.current.style.width = "0vw";
      openChatList();
    }
  };

  const closeChatList = () => {
    chatListRef.current.style.flex = "0";
    chatListRef.current.style.right = "1000vw";
    chatListRef.current.style.width = "0";
    addChatBtn.current.style.display='none'

  };
  const openChat = () => {
    if (getWidth <= 700) {
      chatRef.current.style.left = "0";
      chatRef.current.style.flex = "1";

      chatRef.current.style.width = "100vw";
      closeChatList();
    }
  };

  const handleResize = () => {
    let width = window.innerWidth;
    setWidth(width);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
if(user.length!==0){
  if (getWidth >= 701) {
    chatRef.current.style.flex = "0.65";
    chatListRef.current.style.flex = "0.35";
    chatRef.current.style.left = "0";
    chatListRef.current.style.right = "0";
    chatListRef.current.style.width = "100%";
    chatRef.current.style.width = "100%";
  } else {
    chatRef.current.style.flex = "0";
    chatListRef.current.style.flex = "1";
    addChatBtn.current.style.display='block'

    chatRef.current.style.left = "1000vw";
    chatListRef.current.style.right = "0";
    chatListRef.current.style.width = "100vw";
    chatRef.current.style.width = "0";
  }
}

  }, [getWidth]);


if(user.length===0){
  return <Redirect to='/login'/>

};


return (
  <Fragment>
    <Helmet>
      <link rel="stylesheet" href="/css/Chat.css" />
      <link rel="stylesheet" href="/css/darkmode.css" />

    </Helmet>
    <div className={`${theme.color} chat-container`}>
      <Sidebar myRooms={myRooms} setMyRooms={setMyRooms} sidebarRef={chatListRef} addChatBtn={addChatBtn} openChat={openChat} />
      <Chat  closeChat={closeChat} myRooms={myRooms}  chatRef={chatRef} setMyRooms={setMyRooms}  closeChat={closeChat} />
      
    </div>
  </Fragment>
);
}



export default ChatPage;
