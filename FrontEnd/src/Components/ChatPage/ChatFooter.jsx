import React, {useRef} from "react";
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { EmojiButton } from '@joeattardi/emoji-button';
import { newMessage } from "../../utils/chat";
import { useSelector } from 'react-redux';
import { getLocal } from "../../utils/localstorage";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ChatFooter = () => {
  const picker = new EmojiButton();
  const inputRef=useRef(null)
  const msg=useSelector(state=>state.chat)
  const user=getLocal('user')

  //send message only if room selected 
const sendMsg=(e)=>{

  e.preventDefault()

if('room' in msg){
 if(inputRef.current.value!==''){
  const obj={roomId:msg.room,msg:{from:{id:user.result._id,name:user.result.firstname},txt:inputRef.current.value}}
  newMessage(obj)
  inputRef.current.value=''
 }
}
else{
  toast.warning('choose your room first please')
}
}


  picker.on('emoji', selection => {
    // handle the selected emoji here
    inputRef.current.value+=selection.emoji
  });
  return (
    <div className="chat-footer">
        <InsertEmoticonIcon onClick={(e)=> picker.togglePicker(e.target)}/>
      <form onSubmit={(e)=>{sendMsg(e)}}>
          <input ref={inputRef} placeholder='Type a message'/>
          <button type='submit'>send</button>
      </form>
      <MicIcon/>
    </div>
  );
};

export default ChatFooter;
