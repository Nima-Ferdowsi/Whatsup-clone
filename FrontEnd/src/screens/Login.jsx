import React from "react";
import LoginContainer from "../Components/Login/LoginContainer";
import LoginInput from "../Components/Login/LoginInput";

export default function Tst() {
  return (
    <LoginContainer name="Login">
      <LoginInput
        type="email"
        name="inputEmail"
        label="Email address"
        autofocus={true}
        func="email"
      />
      <LoginInput
        type="password"
        name="inputPassword"
        label="Password"
        autofocus={true}
        func="pass"
      />
    </LoginContainer>
  );
}
