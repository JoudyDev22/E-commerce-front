import { NavLink, useNavigate } from 'react-router-dom';
import './bars.css';                    
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { Menu } from '../Context/MenuContext';
import { WindowSize } from '../Context/WindowContext';
import { links } from './NavLinks';
import { Axios } from '../../Api/axios';
import { USER } from '../../Api/api';
import { Theme } from '../Context/ThemeContext';
import ReactSwitch from 'react-switch';
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
export default function SideBar(){
    //menu context
    const menu=useContext(Menu);
    const isopen=menu.isopen;
     //theme
    const theme=useContext(Theme)
    const mode=theme.mode;
    const settoggle=theme.setmode;
    function toogletheme(){
        settoggle((current)=>(current==="light"?"dark":"light")
        )
        }
    //window context
    const window=useContext(WindowSize);
    const windowsize=window.size;
     //users
        const [user,setuser]=useState('');
        const Navigate=useNavigate();
    //get user
    useEffect(()=>{
        Axios.get(`/${USER}`)
        .then((data)=>setuser(data.data)).catch(()=> Navigate('/login',{replace:true}))
        },[])
    return(
        <>
        <div className="side-bar pt-3" 
        style={{
            left:windowsize<'768'?(isopen ? 0 : "-100%"):0,
            width:isopen?'290px':'fit-content',
            position:windowsize<"768"?'fixed':"sticky"
            }}>
                <div className='border-bottom shadow-sm mb-2'>
                    <p className='fw-bold text-center fs-5 dash'>Dashboard </p>
                </div>
        {links.map((link,index)=>
        link.role.includes(user.role)&&
        (<NavLink 
        key={index}
        to={link.path} 
        className='side-bar-link d-flex align-items-center gap-2'>
        <FontAwesomeIcon icon={link.icon} style={{padding:isopen?'10px 8px 10px 15px':'10px 4px'}} ></FontAwesomeIcon>
        <p className='m-0' 
        style={{display:isopen?'block':'none'}}>{link.name}</p>
        </NavLink>)
        )}
        <div className=' dd fw-bold '>
        <p ><FontAwesomeIcon icon={faSun } color='yellow'></FontAwesomeIcon> / <FontAwesomeIcon icon={ faMoon} color='#ada8a8d1'></FontAwesomeIcon></p>
        <ReactSwitch  onChange={toogletheme} checked={mode==="dark"} ></ReactSwitch>
        </div>
        </div>
        </>
    )
}
