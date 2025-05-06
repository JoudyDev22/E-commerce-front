import { createContext, useState } from "react";
export const Theme=createContext("");

export default function ThemeContext({children}){
    const [mode,setmode]=useState("light");
        return(
            <Theme.Provider value={{mode,setmode}}>
                {children}
                </Theme.Provider>
        )

}