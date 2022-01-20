
export const changeTheme=()=>{

    return async (dispatch,getState)=>{
        const {theme}=getState();
        const themeNew={
            switch:!theme.switch,
            color:theme.color==='dark'?'light':'dark'
        }
        console.log(themeNew);
        dispatch({
            type:'CHANGE_THEME',
            payload:themeNew
        })
    }
}