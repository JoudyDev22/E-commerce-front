import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { useParams } from "react-router-dom";
import { PRODUCTS } from "../../../Api/api";
import Products from "../Products/ProductsBody/Products";
import { Container } from "react-bootstrap";


export default function ProductbyCat(){
    const {id}=useParams()
    const [products,setproducts]=useState([]);
        useEffect(()=>{
            Axios.get(`/${PRODUCTS}`).then((res)=>setproducts(res.data))
        },[])
        const filter=products.filter(pro=>pro.category==id)
        console.log(filter);
        console.log(products);
        const showSale=filter.map((pro,index)=>(
                <Products
                key={index}
                id={pro.id}
                title={pro.title} 
                img1={"https://ecommerce-back-production-1231.up.railway.app"+pro.images[0].image} 
                img2={"https://ecommerce-back-production-1231.up.railway.app"+pro.images[0].image}
                description={pro.description}
                price={pro.price}
                discount={pro.discount} 
                rating={pro.rating}
                ></Products>
            ))
    return(
        <div className="h-100">
        <Container>
            <div className="d-flex gap-3 flex-wrap justify-content-center align-items-stretch mb-4 mt-4 "> 
            {filter.length===0?<div className="d-flex w-50  flex-wrap justify-content-center align-items-center rounded p-2" style={{backgroundColor:"#47bac1",marginTop:"200px"}}>
                <p className="fw-bold text-white">No Results Found ...</p>
                </div>:showSale
            }
            </div>
        </Container>
        </div>
    )
}