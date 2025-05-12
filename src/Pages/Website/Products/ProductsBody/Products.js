import { useState } from 'react';
import { Card} from 'react-bootstrap';
import './product.css';
import { faStar as regularstar } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


export default function Products(props) {
    const [isMobileFlipped,setisMobileFlipped]=useState(false);
    function handleTouchToggle(){
        setisMobileFlipped(prev => !prev)
    }
    const roundedStar=Math.round(props.rating);
    const stars=Math.min(roundedStar,5);
    const GoldenStar=Array.from({length:stars}).map((_,index)=>(
        <FontAwesomeIcon key={index} icon={regularstar} color='#f1f100'></FontAwesomeIcon>
    ))
    const EmptyStars=Array.from({length:5- stars}).map((_,index)=>(
        <FontAwesomeIcon key={index} icon={faStar}></FontAwesomeIcon>
    ))
    return (
    <Link to={`/product/${props.id}`} className='text-decoration-none'>
    <Card className="product-card  shadow-sm rounded " >
    {props.sale &&   <p className='sale'>SALE</p>}
    <div className={` image-wrapper ${isMobileFlipped ?'flipped':''}`}>
        <img src={require(`https://ecommerce-back-production-1231.up.railway.app${props.img1}`)} alt="صورة 1" className="main-image img-fluid" />
        <img src={require(`https://ecommerce-back-production-1231.up.railway.app${props.img2}`)}  alt="صورة 2" className="hover-image img-fluid" />
        </div>
        <Card.Body >
        <Card.Title style={{color:"rgb(24 123 129)"}}>{props.title}</Card.Title>
        <Card.Text className='text-truncate' >{props.description}</Card.Text>
        <div className='d-flex gap-3'>
        <Card.Text className="fw-bold">{props.price}$</Card.Text>
        <Card.Text className="text-decoration-line-through" style={{color:"#a50000"}}>{props.discount}$</Card.Text>
        </div>
        <div className='d-flex'>
        {GoldenStar}
        {EmptyStars}
        </div>
        </Card.Body>
    </Card>
    </Link>

    );
}