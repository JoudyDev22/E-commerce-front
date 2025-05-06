import { useEffect, useState } from "react"
import {  USER } from "../../Api/api";
import {  Outlet, replace, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { Axios } from "../../Api/axios";
import Cookie from 'cookie-universal';
import Err403 from "./Err403";


export default function RequireAuth({allowedRole}){
    //users
    const [user,setuser]=useState('');
    const Navigate=useNavigate();
    //cookie & token
    const cookie=Cookie();
    const token=cookie.get("e-commerce")
    useEffect(()=>{
    Axios.get(`/${USER}`)
    .then((data)=>setuser(data.data)).catch(()=> Navigate('/login',{replace:true}))
    },[])
    return (
        token?
        user===""?
        (<Loading></Loading>):
        allowedRole.includes(user.role)?
        (<Outlet></Outlet>):
        (<Err403 role={user.role}></Err403>):
        (Navigate('/login',{replace:true}))
    )
}