export const getLocal=(local)=>{
    let data;
    if(localStorage.getItem(local)===null){
    data=[]
    }
    else{
      data=JSON.parse(localStorage.getItem(local))
    }
    return data
  }