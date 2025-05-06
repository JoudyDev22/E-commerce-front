import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './bars.css';
import { faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { Menu } from '../Context/MenuContext';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { USER } from '../../Api/api';
import { Axios } from '../../Api/axios';
import { LOGOUT } from "../../Api/api";
import Cookie from 'cookie-universal';



export default function TopBar(){
    //menu
    const menu=useContext(Menu);
    const setisopen=menu.setisopen;
    //state
    const[username,setusername]=useState("");
    //cookie
    const cookie=Cookie();
    //get current user
    useEffect(()=>{
    Axios.get(`/${USER}`).then((data)=>setusername(data.data.name)
    ).catch(()=>console.log("err"))
    },[])
    //logout
    async function handlelogout(){
        try{
            await Axios.get(`/${LOGOUT}`);
            cookie.remove('e-commerce');
            window.location.pathname='/login';
        }catch(err){
        console.log(err);
        }
        }
        return(
        <div>
        <div className="top-bar d-flex align-items-center justify-content-between  ">
            <div className='d-flex align-items-center gap-4'>
            <div className='d-flex align-items-center gap-1'>
            <FontAwesomeIcon icon={faCartShopping} className='text-primary '></FontAwesomeIcon> 
            <h3>E-Commerce</h3>
            </div>
            <FontAwesomeIcon icon={faBars} cursor={'pointer'} className='icon' onClick={()=>setisopen((prev)=>!prev)}></FontAwesomeIcon>
            </div>
                <p></p>
            <div>
            </div>
            <div className='d-flex aligm-items-center gap-2 ' >
            <DropdownButton id="dropdown-basic-button" title={username}>
            <Dropdown.Item onClick={handlelogout} >Logout</Dropdown.Item>
            </DropdownButton>
            </div>
        </div>
        </div>
    )
    }