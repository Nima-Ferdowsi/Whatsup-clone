import { server } from "../config/config.json";
export const getChat = (room,contact, id) => {
  return async (dispatch) => {
    const req =await fetch(`${server}/rooms/get-msg`, {
      method: "POST",
      body: JSON.stringify({roomId:id}),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const res =await req.json();

    const data = { room, contact,  res };
console.log(data);
    dispatch({ type: "get_Messages", payLoad: data });
  };
};


export const newMessage = (msg) => {
  return async (dispatch,getState) => {
   
    const messages=getState().chat

     messages.res.result.push(msg)

    dispatch({ type: "get_Messages", payLoad: messages });
  };
};


 
