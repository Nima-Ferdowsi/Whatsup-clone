import { server } from "../config/config.json";
import { getLocal } from './../utils/localstorage';
export const getRooms = () => {
  return async (dispatch) => {
    const req = await fetch("http://localhost:3000/rooms/get_all");
    const res = await req.json();
    dispatch({ type: "GET_ALL", payload: res });
  };
};

export const newRooms = (user) => {
  return async (dispatch,getState) => {

const rooms=getState().roomReducer

    const req=await fetch("http://localhost:3000/rooms/new-room", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      })

      
      const res=await req.json()
      console.log(res);
    

      const newRoom=[...rooms,res]
      console.log([...rooms,res]);
      dispatch({type:'ADD_ROOM', payload:newRoom})
      const local=getLocal('user')
      local.result.room.push(res.roomId)
      localStorage.setItem('user',JSON.stringify(local))
  };
};



