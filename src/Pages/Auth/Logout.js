import { Col, Container, Row } from "react-bootstrap";
import { LOGOUT } from "../../Api/api";
import { Axios } from "../../Api/axios";
import register from '../../assist/login-bg.svg';
import { Link } from "react-router-dom";
import Cookie from "cookie-universal";
import { useState } from "react";

export default function Logout(){
     //loading
        const [loading,setloading]=useState(false);
     //cookie
        const cookie=Cookie();
         //handle logout
            async function handlelogout(e){
                e.preventDefault();
                setloading(true);
            try{
            await Axios.get(`${LOGOUT}`);
                cookie.remove("e-commerce");
                setloading(false);
                window.location.pathname="/login";
            }catch(err){
                setloading(false)
            console.log("none")
            }
            }
    return(
        <>
        <section >
            <Container>
                <Row className="row">
                    <form className="form shadow "  >
                    <Col >
                    <div className="custom-form" style={{margin:"50px"}}>
                                <h1 className="title">LOGOUT </h1>
                                <p style={{fontWeight:"bold",color:"#000000bd",marginBottom:"40px"}}>Thank you for using Big Bag, We are waiting for you.</p>
                                    <div style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start",flexDirection:"column",gap:"10px"}}>
                                    <button className="btn btn-primary" onClick={handlelogout}>Logout</button>
                                    <p style={{fontWeight:"bold",color:"#000000bd"}}>Don't have an account?<Link to="/register" className="signlink text-decoration-none"> Sign Up </Link></p> 
                                    </div>
                                    </div>
                    </Col>
                    <Col lg={6}>
                    <img src={register} alt="register" className="img-fluid"></img>
                    </Col>
                    </form>
                </Row>
            </Container>
        </section>
        </>
    )
}