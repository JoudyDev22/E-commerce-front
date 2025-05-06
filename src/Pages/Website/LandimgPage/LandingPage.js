import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import slide1 from './../../../assist/slider-1.jpg';
import slide2 from './../../../assist/slider-2.jpg';
import slide3 from './../../../assist/slider-4.jpg';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function LandingPage(){
    const [index, setIndex] = useState(0);
    function handleSelect(selectedIndex){
        setIndex(selectedIndex)
    }
    return(
        <>
        <Carousel activeIndex={index} onSelect={handleSelect} interval={3000} fade pause={false} >
        <Carousel.Item >
        <img src={slide3} alt='img' className="w-100"  style={{height:"100vh" ,objectFit:"cover"}}></img>
        <Carousel.Caption style={{textAlign:"left",left:"auto",right:"10%",bottom:"40%"}}>
            <h3 className="fw-bold fs-1">FASHION</h3>
            <p className=" fs-5">Explore this week's lateest menwear pieces of the season<br></br> curated for you Autumn Winter man Collection</p>
            <Button className=" bg-white border-0  px-4  ">
              <Link className="text-decoration-none text-dark fs-5" to={`/categories`}>VIEW ALL</Link>
            </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={slide1} alt='img' className="w-100" style={{height:"100vh" ,objectFit:"cover"}}></img>
        <Carousel.Caption style={{textAlign:"left",right:"auto",left:"10%",bottom:"40%"}}>
          <h3 className="fw-bold fs-1">TRENDING</h3>
          <p className="fs-5">Explore this week's lateest menwear pieces of the season<br></br> curated for you Autumn Winter man Collection</p>
          <Button className=" bg-white border-0  px-4  ">
              <Link className="text-decoration-none text-dark fs-5" to={`/categories`}>VIEW ALL</Link>
            </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={slide2} alt='img' className="w-100" style={{height:"100vh" ,objectFit:"cover"}}></img>
        <Carousel.Caption style={{left:"auto",bottom:"43%",right:"10%",textAlign:"left"}} >
          <h3 className="fw-bold fs-1 "  >UPCOMINGS</h3>
          <p className="fs-5  "  >Explore this week's lateest menwear pieces of the season curated <br></br>for you Autumn Winter man Collection</p>
          <Button className=" bg-white border-0  px-4  ">
              <Link className="text-decoration-none text-dark fs-5" to={`/categories`}>VIEW ALL</Link>
            </Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        </>
        
    )
}