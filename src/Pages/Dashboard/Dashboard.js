import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/SideBar";
import TopBar from "../../Components/Dashboard/TopBar";
import './dashboard.css';

import { useContext } from 'react';
import { Theme } from "../../Components/Context/ThemeContext";




export default function Dashboard(){
    const theme=useContext(Theme)
        const mode=theme.mode;
    return(
        <div className="dashboard position-relative " id={mode}>
            <TopBar></TopBar>
            <div style={{marginTop:"70px"}} className="d-flex gap-2">
            <SideBar></SideBar>
            <Outlet></Outlet>
            </div>
        </div>
    )
}