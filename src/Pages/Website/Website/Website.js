import { Outlet } from "react-router-dom";
import NavBar from "../../../Components/Website/Header/NavBar";



export default function Website(){
    return(
        <>
        <NavBar></NavBar>
        <Outlet></Outlet>
        </>
    )
}