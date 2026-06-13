import React, { useState, useEffect, Fragment } from "react";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from 'react-toastify';
import { server } from "../../config/config.json";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { getLocal } from './../../utils/localstorage';
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const UploadModal = (props) => {
  const [modalStyle] = React.useState(getModalStyle);

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    input: {
        display: 'none',
      }
  }));

  const classes = useStyles();

  const [img, setImg] = useState("");
  const [progress, setProgress] = useState(0);
  const [progressing, setProgressing] = useState(false);

const user=getLocal('user')

  const handleChangeFile = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };


const close=()=>{
if(progressing==false){
    props.close(false)

}
};

const upload=()=>{
if(img){
      
const xhr=new XMLHttpRequest()
xhr.upload.onprogress = function(evt)
{
    if (evt.lengthComputable)
    {
        setProgressing(true)
        var percentComplete = parseInt((evt.loaded / evt.total) * 100);
        setProgress(percentComplete)
      
    }
};
 xhr.open("POST", `${server}/upload-avatar`);
 xhr.onload = function(){
    if(xhr.status === 200){
        setProgress(0)
        setProgressing(false)
        setImg('')
        props.close(false)
        const user=getLocal('user')
        user.result.avatar=this.responseText
        localStorage.setItem('user',JSON.stringify(user))
       toast.success('Upload has been completed ')
    } else{
      toast.error('there is an error from server sorry')
    }
  }; 
var fd=new FormData()
fd.append('avatar',img)
fd.append('id',user.result._id)
fd.append('room',user.result.room)
xhr.send(fd)
}
else{
  toast.warn('No Image Selected')
}
}


  return (
<Fragment>
<Modal
      open={props.open}
      onClose={() => {
          close()
        
       
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <div className="upload_container">
          <progress value={progress} max="100" style={{width:'100%'}} className="progress-bar" />
    

          <input
            accept="image/*"
            className={classes.input}
            accept="image/x-png,image/jpeg"
            id="icon-button-file"
            onChange={handleChangeFile} 
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
          <Button onClick={upload}>Upload </Button>
          <p>{typeof img.name!=='undefined'?img.name:''}</p>
        </div>
      </div>

    </Modal>
          <ToastContainer/>
</Fragment>

  );
};

export default UploadModal;
