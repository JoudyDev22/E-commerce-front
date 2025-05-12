import { useEffect, useState } from "react"
import { Axios } from "../../../../Api/axios";
import { LATESTPRO } from "../../../../Api/api";
import Products from "../ProductsBody/Products";
import SkeletonShow from "../../../../Components/Skeleton/SkeletonShow";

export default function LatestProducts(){
    const [products,setProducts]=useState([]);
    const [Loading,setLoading]=useState(true)
    useEffect(()=>{
    Axios.get(`${LATESTPRO}`).then((data)=>setProducts(data.data)).finally(()=>setLoading(false))
    },[])
    console.log(products);
    const showProducts=products.map((pro,index)=>(
        <Products
                key={index}
                id={pro.id}
                title={pro.title} 
                img1={pro.images[0].image} 
                img2={pro.images[0].image}
                description={pro.description}
                price={pro.price}
                discount={pro.discount} 
                rating={pro.rating}
                ></Products>
    ))
    return(
        <div className="col-12 col-md-6 ">
        <h1 className="mt-4 ms-3">Latest Products</h1>
        <div className="d-flex flex-wrap gap-3 mx-5 mt-3 justify-content-center align-items-stretch">
            {Loading?<SkeletonShow height="250px" baseColor="#e1f4f5" length="4" className="product-card"></SkeletonShow>:showProducts}
        </div>
        </div>
    )
}