import { createContext, useEffect, useState } from "react";

export const WindowSize=createContext(null);

export default function WindowContext({children}){
    const [size,setsize]=useState(window.innerWidth);
    useEffect(()=>{
    function setwindowwidth(){
        setsize(window.innerWidth);
    }
    window.addEventListener("resize",setwindowwidth);
    //cleanup eventlistener
    return ()=>{
        window.removeEventListener("resize",setwindowwidth);
    }
    },[])

    return(<WindowSize.Provider value={{size}}>{children}</WindowSize.Provider>)
}