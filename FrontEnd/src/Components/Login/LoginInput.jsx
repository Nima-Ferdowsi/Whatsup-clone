import React, { Fragment } from "react";
import { onchanges } from "../../utils/login/form_onchange";
import {
  changeEmail,
  changeFirst,
  changeLast,
  changePass,
  reset,
} from "../../Rx/action/user";
import { useDispatch } from "react-redux";

export default function LoginInput(props) {
  const dispatch = useDispatch();
  const getValue = (type, e) => {
    const funcs = {
      first: changeFirst(e.target.value),
      last: changeLast(e.target.value),
      email: changeEmail(e.target.value),
      pass: changePass(e.target.value),
    };
    return funcs[type]
  };
  return (
    <Fragment>
      <label for={props.name} className="sr-only">
        {props.Label}
      </label>
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        className="form-control mb-2"
        placeholder={props.label}
        required
        autofocus={props.autofocus ? true : false}
        onChange={(e) => {
          onchanges(e, props.func, dispatch(getValue(props.func, e)));
        }}
        ref={props.ref ? props.ref : null}
      />
    </Fragment>
  );
}
