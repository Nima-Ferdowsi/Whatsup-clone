export const newUser = (user) => {
  return async (dispatch) => {
    await dispatch({ type: "NEWUSER", payLoad: user });
  };
};


//change first name state

export const changeFirst = (value) => {
  return async (dispatch) => {
    await dispatch({ type: "changeFirst", payLoad: value });
  };
};
//change last name state

export const changeLast = (value) => {
  return async (dispatch) => {
    await dispatch({ type: "changeLast", payLoad: value });
  };
};
//change password state

export const changePass = (value) => {
  return async (dispatch) => {
    await dispatch({ type: "changePass", payLoad: value });
  };
};
//change email state
export const changeEmail = (value) => {
  return async (dispatch) => {
    await dispatch({ type: "changeEmail", payLoad: value });
  };
};

// reset the state
export const reset = (type) => {
  return async (dispatch) => {
    switch (type) {
      case "first":
        await dispatch({ type: "CLEAR_FIRST", payLoad: "" });
        break;
      case "last":
        await dispatch({ type: "CLEAR_LAST", payLoad: "" });
        break;
      case "pass":
        await dispatch({ type: "CLEAR_PASS", payLoad: "" });
        break;
      case "email":
        await dispatch({ type: "CLEAR_EMAIL", payLoad: "" });
        break;
    }
  };
};
