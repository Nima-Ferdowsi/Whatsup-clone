import React,{useEffect} from "react";
import { changeEmail, changeFirst, changeLast } from "../../Rx/action/user";
import { useDispatch } from 'react-redux';

const GoogleBtn = (props) => {
    const dispatch = useDispatch();

    const onSignIn = async (googleUser) => {
        
        var profile = googleUser.getBasicProfile();
        let first = profile.getName().split(" ")[0];
        let last = profile.getName().split(" ")[1];
        let email = profile.getEmail();
    
        dispatch(changeFirst(first));
        dispatch(changeLast(last));
        dispatch(changeEmail(email));
    
        props.emailRef.current.style.display = "none";
        props.firstRef.current.style.display = "none";
        props.lastRef.current.style.display = "none";
    
        googleUser.disconnect();
      };

  useEffect(() => {
 setTimeout(() => {
  window.gapi.signin2.render("my-signin2", {
    width: 240,
    height: 50,
    longtitle: true,
    onsuccess: onSignIn,
  });
 }, 1000);
  }, []);

  return (
    <button
      type="button"
      className="google-btn mt-4 g-signin2"
      id="my-signin2"
    ></button>
  );
};

export default GoogleBtn;
