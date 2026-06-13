export const chat=(state={},action)=>{

switch (action.type) {
    case 'get_Messages':
        
        return {...action.payLoad};

    default:
       return state;
}


}