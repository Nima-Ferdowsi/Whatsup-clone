import { combineReducers } from "redux";
import { user,firstname,lastname,pass,email } from "./user";
import { roomReducer } from "./rooms";
import { userList } from "./userList";
import { chat } from "./chat";

export const reducers=combineReducers({
    user,
    firstname,
    lastname,
    pass,
    email,
    roomReducer,
    userList,
    chat
})
