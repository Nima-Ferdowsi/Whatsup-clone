import React,{useRef} from "react";
import LoginContainer from "../Components/Login/LoginContainer";
import LoginInput from "../Components/Login/LoginInput";

export default function Signup() {
    const emailRef = useRef(null);
    const firstRef = useRef(null);
    const lastRef = useRef(null);
  return (
    <LoginContainer name="Signup">
      <LoginInput
        type="text"
        name="firstName"
        label="First Name"
        autofocus={true}
        func="first"
        ref={firstRef}
      />
     <LoginInput
        type="text"
        name="lastName"
        label="Last Name"
        func="last"
        ref={lastRef}
      />
         <LoginInput
        type="email"
        name="inputEmail"
        label="Email address"
        func="email"
        ref={emailRef}
      />
         <LoginInput
        type="password"
        name="inputPassword"
        label="Password"
        func="pass"
      />
    </LoginContainer>
  );
}
