import { server } from "../../config/config.json";
import { getLocal } from "./../../utils/localstorage";

//get the chat messages
export const getChat = (room, contact, id) => {
  return async (dispatch) => {
    const req = await fetch(`${server}/rooms/get-msg`, {
      method: "POST",
      body: JSON.stringify({ roomId: id }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const res = await req.json();

    const data = { room, contact, res };
    dispatch({ type: "get_Messages", payLoad: data });
  };
};

//add new message in state
export const newMessage = (msg) => {
  return async (dispatch, getState) => {
    const messages = getState().chat;

    messages.res.result.push(msg);

    dispatch({ type: "get_Messages", payLoad: messages });
  };
};
export const clearChatState = () => {
  return async (dispatch, getState) => {
    /*  const req =await fetch(`${server}/rooms/delete-room`, {
      method: "POST",
      body: JSON.stringify({roomId:getState().chat.room}),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }); */
    const user = getLocal("user").result;

    user.room.splice(user.room.indexOf(getState().chat.room), 1);
    localStorage.setItem("user", JSON.stringify({ status: 200, result: user }));

    dispatch({ type: "get_Messages", payLoad: [] });
  };
};
