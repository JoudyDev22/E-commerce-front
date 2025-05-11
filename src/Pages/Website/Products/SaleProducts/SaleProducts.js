import { useEffect, useState } from "react"
import { Axios } from "../../../../Api/axios";
import { SALE } from "../../../../Api/api";
import { Container } from "react-bootstrap";
import Products from "../ProductsBody/Products";
import SkeletonShow from "../../../../Components/Skeleton/SkeletonShow";

export default function SaleProducts(){
    const [loading,setLoading]=useState(true);
    const [products,setproducts]=useState([]);
    useEffect(()=>{
        Axios.get(`/${SALE}`).then((res)=>setproducts(res.data)).finally(()=>setLoading(false))
    },[])
    console.log(products);
    const showSale=products.map((pro,index)=>(
        <Products
        key={index}
        id={pro.id}
        title={pro.title} 
        img1={"https://ecommerce-back-production-1231.up.railway.app"+pro.images[0].image} 
        img2={"https://ecommerce-back-production-1231.up.railway.app"+pro.images[1].image}
        description={pro.description}
        price={pro.price}
        discount={pro.discount} 
        sale
        rating={pro.rating}
        ></Products>
    ))
    return(
        <>
        <Container>
            <h1 className="py-3">Discount on Products</h1>
            <div className="d-flex gap-3 flex-wrap justify-content-center align-items-stretch mb-4 "> 
            {loading ?<SkeletonShow height="250px" baseColor="#e1f4f5" length="8" className="product-card"></SkeletonShow>:showSale}
            </div>
        </Container>
        </>
    )
}