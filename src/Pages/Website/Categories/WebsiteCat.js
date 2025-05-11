import { Container} from "react-bootstrap";
import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { CAT } from "../../../Api/api";
import './cat.css';
import SliceData from "../../../Helpers/SliceData";
import SkeletonShow from "../../../Components/Skeleton/SkeletonShow";
import { Link } from "react-router-dom";


export default function WebsiteCat(){
    const [categories,setcategories]=useState([]);
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
    Axios.get(`${CAT}`).then((data)=>setcategories(data.data)).finally(()=>setLoading(false))
    },[])
    console.log(categories);
    const showcat=categories.map((cat,index)=>(
        <Link className="cat-card shadow-sm text-decoration-none" key={index}  to={`/categories/${cat.id}`}>
            <div style={{width:"50px"}}><img src={"https://ecommerce-back-production-1231.up.railway.app"+cat.image} className="img-fluid card-img" alt="img"></img></div>
            <p className="fw-bold  text-dark">{SliceData(cat.title,15)}</p>
        </Link>
    ))
    return(
        <>
        <div className="showcat">
            <Container>
                    <h3 className="py-2">Shop By Product</h3>
                    <div className="d-flex gap-3 flex-wrap align-items-start justify-content-center ">
                    {loading ?<SkeletonShow length="12"  baseColor="white"  className="cat-card"></SkeletonShow>:showcat}
                    </div>
            </Container>
        </div>
        </>
    )
}