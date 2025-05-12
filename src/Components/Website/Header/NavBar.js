import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './nav.css'
import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CAT } from '../../../Api/api';
import {Axios} from '../../../Api/axios';
import { Link } from 'react-router-dom';
import SliceData from '../../../Helpers/SliceData';
import SkeletonShow from '../../Skeleton/SkeletonShow';
import Modal from 'react-bootstrap/Modal';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { Cart } from '../../Context/CartContext';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import PlusMinus from '../PlusMinus/PlusMinus';
import { PersonFill } from 'react-bootstrap-icons';



export default function NavBar() {
    const [categories,setcategories]=useState([]);
    const [products,setproducts]=useState([]);
    const [loading,setLoading]=useState(true);
    const [count,setcount]=useState(1);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const cart=useContext(Cart)
    const change=cart.ischange;
    //get categories data
    useEffect(()=>{
    Axios.get(`${CAT}`).then((data)=>setcategories(data.data.slice('-9'))).then(()=>setLoading(false))
    },[])
    
    const showCategories=categories.map((cat,index)=>(
        <p key={index}><Link to={`/categories/${cat.id}`} className='text-decoration-none cat-title text-dark '>
            { SliceData(cat.title,15)}
            </Link></p>
    )
    )
    //handleDelete
    function handleDelete(id){
    const filterProducts=products.filter((pro)=>pro.id !==id);
    setproducts(filterProducts);
    localStorage.setItem("product",JSON.stringify(filterProducts))
    }
    //changecart
    function changecount(id,btncount){
        const cart=JSON.parse(localStorage.getItem("product"))||[];
        const find=cart.find((pro)=>pro.id ===id);
        find.count=btncount;
        localStorage.setItem("product",JSON.stringify(cart));
    }
    //show cart
    useEffect(()=>{
    const getproducts=JSON.parse(localStorage.getItem('product')) || [];
    setproducts(getproducts)
    },[change,count])
    const showCart=products?.map((pro,index)=>(
        <>
        <div className='d-flex row-gap-3 position-relative' key={index} style={{height:"130px"}}>
            <div className='bg-danger rounded-circle d-flex justify-content-center align-items-center p-2 position-absolute top-0 end-0' style={{width:"20px",height:"20px",cursor:"pointer"}} 
            onClick={()=>handleDelete(pro.id)}>
                <FontAwesomeIcon icon={faXmark} color='white'></FontAwesomeIcon>
            </div>
                <div style={{width:"150px",height:"100px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <img src={`https://ecommerce-back-production-1231.up.railway.app${pro.images[0].image}`} alt="img" className='img-fluid w-50'></img>
                </div>
                <div>
                    <h1 className='fs-4 text-black'>{pro.title}</h1>
                    <p className='text-black'>{pro.description}</p>
                    <div className='d-flex gap-3'>
                    <p className='text-black'>{pro.price}$</p>
                    <p className="text-decoration-line-through" style={{color:"#a50000"}}>{pro.discount}$</p>
                    </div>
                </div>
                </div>
                    <PlusMinus
                    count={pro.count || 1}
                    setcount={setcount}
                    id={pro.id}
                    changecount={changecount}
                    ></PlusMinus>
                <hr></hr>
                </>
    ))
    return (
        <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>CART</Modal.Title>
        </Modal.Header>
        <Modal.Body>{showCart}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
        </Modal.Footer>
        </Modal>
        <Container>
        <Navbar expand="lg" className="bg-body-white">
            <div className=' d-flex w-100 justify-content-between align-items-center'>
        <Navbar.Brand href="/" className='fw-bold fs-3 ' >
        <FontAwesomeIcon icon={faShoppingCart} color='#47bac1' ></FontAwesomeIcon>Big <span style={{color:"#47bac1"}}>Bag</span>
        </Navbar.Brand>
        <div className='d-flex align-items-center gap-3 flex-wrap'>
            <Nav.Link onClick={handleShow}><FontAwesomeIcon icon={faShoppingCart} color='black' className='fw-bold fs-4 '></FontAwesomeIcon></Nav.Link>
            <DropdownButton id="dropdown-basic-button " title={ <PersonFill></PersonFill>}
            align={'end'}    variant={null} style={{backgroundColor:"#47bac1",color:"white",borderRadius:"3px"}}>
            <Dropdown.Item href='/register'>SignUp</Dropdown.Item>
            <Dropdown.Item href="/login">Login</Dropdown.Item>
            <Dropdown.Item href="/logout">Logout</Dropdown.Item>
            </DropdownButton>
            </div>
        </div>
        </Navbar>
            <div className='d-flex gap-4 align-items-center justify-content-start  flex-wrap '>   
                {loading ?<SkeletonShow length={9} baseColor="#e1f4f5" height="20px" width="90px" ></SkeletonShow>:showCategories}
                <p><Link className='text-decoration-none fw-bold' style={{color:"#47bac1"}} to={'/categories'}>Show All</Link></p>
                </div>
        </Container>
                </>
    );
}

