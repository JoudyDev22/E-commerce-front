import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { Axios } from "../../../../Api/axios";
import { PRO } from "../../../../Api/api";
import { useParams } from "react-router-dom";
import { faStar as regularstar } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SkeletonShow from "../../../../Components/Skeleton/SkeletonShow";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Cart } from "../../../../Components/Context/CartContext";
import PlusMinus from "../../../../Components/Website/PlusMinus/PlusMinus";
import Footer from "../../../../Components/Website/Footer/Footer";





export default function SingleProduct(){
    const [product,setProduct]=useState({});
    const [productImage,setproductImage]=useState([])
    const [loading,setLoading]=useState(true);
    const [count,setcount]=useState(1)
    const {id}=useParams();
    const cart=useContext(Cart)
    const setischange=cart.setischange;
    //rating
    const roundedStar=Math.round(product.rating);
        const stars=Math.min(roundedStar,5);
        const GoldenStar=Array.from({length:stars}).map((_,index)=>(
            <FontAwesomeIcon key={index} icon={regularstar} color='#f1f100'></FontAwesomeIcon>
        ))
        const EmptyStars=Array.from({length:5- stars}).map((_,index)=>(
            <FontAwesomeIcon key={index} icon={faStar}></FontAwesomeIcon>
        ))
    //get product by id
    useEffect(()=>{
    Axios.get((`/${PRO}/${id}`))
    .then((data)=>{setproductImage(data.data[0].images.map((img)=>{
        return{
            original:img.image,
            thumbnail:img.image
        }
    }));
    setProduct(data.data[0])
}
).finally(()=>setLoading(false))
    },[]) 
    //store product in localstorage
    function saveCart(){
    const cart=JSON.parse(localStorage.getItem("product"))||[];
    const productExist=cart.findIndex((item)=>item.id ==id);
    console.log(productExist);
    if(productExist !== -1){
    if(cart[productExist].count){
        Number(cart[productExist].count +=count);
    }else{
    cart[productExist].count=count;
    }
    }else{
        if(count>1){
            product.count=count;
        }
    cart.push(product)
    }
    localStorage.setItem("product",JSON.stringify(cart));
    setischange(prev=>!prev)
    }
    return(
        <>
        <Container>
            <Row className="align-items-start mt-5 d-flex ">
                {loading?<>
                <div className="col-12 col-md-6  ">
                    <SkeletonShow  height="350px" baseColor="#e1f4f5" length="1" ></SkeletonShow>
                <div className="col-6 d-flex gap-2 ">
                <SkeletonShow  height="70px" baseColor="#e1f4f5" length="1" className="col-4" ></SkeletonShow>
                <SkeletonShow  height="70px" baseColor="#e1f4f5" length="1"  className="col-4"></SkeletonShow>
                </div>
                </div>
                <div className="d-flex flex-column flex-wrap  justify-content-center align-items-start col-12 col-md-6"> 
                <SkeletonShow  height="30px" baseColor="#e1f4f5" length="1" className="col-3"></SkeletonShow>
                <SkeletonShow  height="30px" baseColor="#e1f4f5" length="1" className="col-6"></SkeletonShow>
                <SkeletonShow  height="150px" baseColor="#e1f4f5" length="1" className="col-8"></SkeletonShow>
                <hr style={{width:"100%"}}></hr>
                <div className='d-flex gap-3 w-100'>
                <SkeletonShow  height="30px" baseColor="#e1f4f5" length="1" className="col-3"></SkeletonShow>
                <SkeletonShow  height="30px" baseColor="#e1f4f5" length="1" className="col-3"></SkeletonShow>
                </div>
                <div className=' w-100 mt-4'>
                <SkeletonShow  height="30px" baseColor="#e1f4f5" length="1" className="col-6"></SkeletonShow>
                </div>
                </div>
                </>
                :
                <>
                <Col md={6} xs={12}>
                <div className="img-slider">
                <ImageGallery 
                items={productImage}
                />
                </div>
                </Col>
                <Col md={6} xs={12}>
                <div className="d-flex flex-column flex-wrap  justify-content-center align-items-start"> 
                <h1 style={{color:"rgb(24 123 129)"}}>{product.title}</h1>
                <p className="fs-4">{product.description}</p>
                <p>{product.About}</p>
                <hr style={{width:"100%"}}></hr>
                <div className='d-flex justify-content-between w-100 flex-wrap'>
                    <div className="d-flex gap-3">
                <p className="fw-bold ">{product.price}$</p>
                <p className="text-decoration-line-through" style={{color:"#a50000"}}>{product.discount}$</p>
                    </div>
                <div><PlusMinus setcount={(data)=>setcount(data)}></PlusMinus></div>
                <div style={{width:"30px",height:"30px",backgroundColor:"#47bac1",cursor:"pointer"}} className="d-flex justify-content-center align-items-center rounded-1 p-3" 
                onClick={saveCart} >
                <FontAwesomeIcon icon={faShoppingCart} color='white' ></FontAwesomeIcon>
                </div>
                </div>
                <div >
                <div className='d-flex' >
                {GoldenStar}
                {EmptyStars}
                </div>
                </div>
                </div>
                </Col>
                </>}
            </Row>
        </Container>
        <Footer></Footer>
        </>
    )
}