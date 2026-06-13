
const themeInitial={switch:true,color:'dark'};
export const theme=(state=themeInitial,action)=>{

    switch(action.type){
        case 'CHANGE_THEME':
            return action.payload;
        default:
            return state;
    }

}