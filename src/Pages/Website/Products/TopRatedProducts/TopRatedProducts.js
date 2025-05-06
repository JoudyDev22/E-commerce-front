import { faStar as regularstar } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export default function TopRatedProducts(props){
    const roundedStar=Math.round(props.rating)
    const stars=Math.min(roundedStar,5);
    const GoldenStar=Array.from({length:stars}).map((_,index)=>(
    <FontAwesomeIcon key={index} icon={regularstar} color='#f1f100'></FontAwesomeIcon>
    ))
    const EmptyStars=Array.from({length:5- stars}).map((_,index)=>(
            <FontAwesomeIcon key={index} icon={faStar}></FontAwesomeIcon>
        ))
    return(
        <Link to={`/product/${props.id}`} className='d-flex row-gap-3 text-decoration-none'>
        <div style={{width:"200px",height:"100px",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <img src={props.img} alt="img" className='img-fluid w-50'></img>
        </div>
        <div>
            <h1 className='fs-3 text-black'>{props.title}</h1>
            <p className='text-black'>{props.description}</p>
            <p className='text-black'>{props.price}$</p>
            <p>{GoldenStar}{EmptyStars}</p>
        </div>
        </Link>
    )
}