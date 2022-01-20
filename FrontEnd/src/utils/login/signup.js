import { useDispatch, useSelector } from "react-redux";
import { newUser } from "../../Rx/action/user";
import { isFormValid } from "./formvalid";
import { User } from "./User";
import { server } from "../../config/config.json";
import { withRouter } from "react-router";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';

const SignUpBtn = (props) => {
  const [loading,setLoading]=useState(false)

  //states
  const firstname = useSelector((state) => state.firstname);
  const lastname = useSelector((state) => state.lastname);
  const email = useSelector((state) => state.email);
  const pass = useSelector((state) => state.pass);

  const dispatch = useDispatch();
const validateEmail = (email) =>{
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

  const signUp = async () => {
   if(isFormValid([firstname,lastname,email,pass])){
    if(!validateEmail(email)){
      toast.error("thats not real email")
  
     }
   else{ const newuser = new User();
    newuser.firstname = firstname;
    newuser.lastname = lastname;
    newuser.email = email;
    newuser.pass = pass;
    setLoading(true)

    fetch(`${server}/signin`, {
      method: "Post",
      body: JSON.stringify(newuser),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setLoading(false)
        if (data.message == "succses") {
          props.history.push("/login");
        } else if (data.message == "exist") {
          toast.error(data.detailes);
        }
      })
      .catch((err) => toast.error(err));

    await dispatch(newUser(newuser));
   }}
   else{
     toast.error("please fill all fields")
   }
  };
  return (
    <button
      className="btn btn-lg btn-primary btn-block"
      disabled={!isFormValid([firstname, lastname, email, pass])}
      onClick={signUp}
    >
   {loading? (<div class="spinner"></div>):null}     Sign up
    </button>
  );
};

export default withRouter(SignUpBtn);
