import {server} from '../../config/config.json'

// get all users 

export const getUsers = () => {
  return async (dispatch) => {
    const req = await fetch(`${server}/get_usersList`);
    const res = await req.json();
    dispatch({ type: "GET_ALL_USERS", payload: res });
  };
};
