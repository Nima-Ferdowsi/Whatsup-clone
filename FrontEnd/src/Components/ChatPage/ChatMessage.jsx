import React,{ Fragment ,useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from "@material-ui/core";
import { removeMsg } from './../../utils/chat';
const ChatMessage = (props) => {
  function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
    
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
 
  const center={
  display:'flex',
  justifyContent: "center",
  width:'100%'

  }
  const handleClose=()=>{
    setOpen(false)
  }
 const handleRemove=()=>{
   removeMsg({_id:props.id})
   handleClose()
 }
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] =useState(getModalStyle);
  const [open, setOpen] =useState(false);
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h6 style={center} id="simple-modal-title">You sure to delete message?</h6>
      <div style={center}>
    <Button onClick={handleRemove} style={{marginRight:'40px'}} variant='contained' color='primary'>Yes</Button>
    <Button onClick={handleClose}  variant='contained' color='secondary'>No</Button>

      </div>
    </div>
  );



  return (
<Fragment>
<Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    {body}
  </Modal>
    <p onClick={()=>setOpen(true)}  key={props.id} id={props.id} className={`chat-message ${props.messageClass}`}>
       {props.txt}
      <span className="chat-name">{props.name}</span>
      <span className="chat-timestamp">{new Date().toUTCString()}</span>
    </p>
</Fragment>
  );
};

export default ChatMessage;
