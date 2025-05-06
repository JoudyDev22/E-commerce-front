import { useEffect, useState } from "react"
import { Axios } from "../../../../Api/axios";
import { TOPRATEDPRO } from "../../../../Api/api";
import TopRatedProducts from "./TopRatedProducts";
import SkeletonShow from "../../../../Components/Skeleton/SkeletonShow";


export default function ShowTopRatedProducts(){
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
    Axios.get(`${TOPRATEDPRO}`).then((data)=>setProducts(data.data)).finally(()=>setLoading(false))
    },[])
    const showTop=products.map((pro,index)=>(
        <>
        <TopRatedProducts 
        key={index}
        id={pro.id}
        img={pro.images[0].image}
        title={pro.title}
        description={pro.description}
        price={pro.price}
        rating={pro.rating}
        ></TopRatedProducts>
        <hr></hr>
        </>
    ))
    return(
        <div className=" col-12 col-md-6 ">
            <div className="TopRated-card ">
            <h1 className="top-title ">Top Rated</h1>    
            <div className="  mx-3 mt-3">
                {loading?<SkeletonShow  height="150px" baseColor="#e1f4f5" length="4" width="90%"></SkeletonShow>:showTop}
                </div>
            </div>
        </div>
    )
}