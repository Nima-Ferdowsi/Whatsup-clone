import React from "react";

const ChatMessage = (props) => {
  console.log(props.txt);
  return (
    <p className={`chat-message ${props.messageClass}`}>
       {props.txt}
      <span className="chat-name">Nima</span>
      <span className="chat-timestamp">{new Date().toUTCString()}</span>
    </p>
  );
};

export default ChatMessage;
