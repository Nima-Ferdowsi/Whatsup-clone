import { server} from "../config/config.json";

export const reciverInfo = (type,list,props) => {
     //return contact name from array
     // list parameter is the room info that containes
     console.log(list)
 if(props.types!='users'){
  if(typeof list[0] !=='undefined'){
    const storage = JSON.parse(localStorage.getItem("user"));
    const index = list[0].users.findIndex(
      (elem) => elem.id !== storage.result._id
    );

    console.log(list[0])

   switch (type) {
     case 'name':
      return list[0].users[index].user
      case 'user':
        return list[0].users[index]
      case 'roomId':
        return list[0].roomId
        case 'avatar':
          return list[0].users[index].avatar
        }
  }
 }
 else{
   return list
 }
};



export const newMessage=async (msg)=>{
   fetch(`${server}/rooms/new-msg`, {
    method: "POST",
    body: JSON.stringify(msg),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

}
export const removeMsg=async (msg)=>{
  fetch(`${server}/rooms/remove-msg`, {
   method: "POST",
   body: JSON.stringify(msg),
   headers: {
     "Content-Type": "application/json",
     Accept: "application/json",
   },
 });

}