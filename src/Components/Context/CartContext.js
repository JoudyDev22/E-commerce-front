import { createContext, useState } from "react";

export const Cart=createContext('')
export default function CartContext({children}){
    const [ischange,setischange]=useState(true);
    return <Cart.Provider value={{ischange,setischange}} >{children}</Cart.Provider>
}