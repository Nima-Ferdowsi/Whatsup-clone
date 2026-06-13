import { server } from "../../config/config.json"
import { getLocal } from '../../utils/localstorage';

//get all rooms
export const getRooms = () => {
  return async (dispatch) => {
    const req = await fetch(`${server}/rooms/get_all`);
    const res = await req.json();
    dispatch({ type: "GET_ALL", payload: res });
  };
};

//create new room
export const newRooms = (user) => {
  return async (dispatch,getState) => {

const rooms=getState().roomReducer

    const req=await fetch(`${server}/rooms/new-room`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      })

      
      const res=await req.json()
    

      const newRoom=[...rooms,res]
      dispatch({type:'ADD_ROOM', payload:newRoom})
      const local=getLocal('user')
      local.result.room.push(res.roomId)
      localStorage.setItem('user',JSON.stringify(local))
  };
};




