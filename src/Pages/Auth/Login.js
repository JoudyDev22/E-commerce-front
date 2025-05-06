import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import register from '../../assist/login-bg.svg';
import axios from "axios";
import { BaseUrl, LOGIN } from "../../Api/api";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import Cookie from 'cookie-universal';


export default function Login(){
    //usestates
    const [form,setform]=useState({
        email:"",
        password:"",
    })
    //Ref
    const focus=useRef(null);
    //handle focus
    useEffect(()=>{
        focus.current.focus();
    },[])
    //cookie
    const cookie=Cookie()
    //err &accept
    const [err,seterr]=useState("");
    const [accept,setaccept]=useState(false);
    //loading
    const [loading,setloading]=useState(false);
    //handle inputes changes
    function handlechange(e){
        setform({...form,[e.target.name]:e.target.value})
    }
    //handlesubmit
    async function handlesubmit(e){
        let flag=true;
        e.preventDefault();
        setloading(true);
        setaccept(true);
        if(form.password.length<6){
            flag=false;
            setloading(false);
        }else{
            flag=true;
            setloading(true)
        }
        try {
            if(flag){
                const res= await axios.post(`${BaseUrl}/${LOGIN}`,form);
                const token=res.data.token;
                const go=res.data.user.role;
                cookie.set('e-commerce',token);
                setloading(false);
                window.location.pathname=go==="1995"?'/dashboard/users':'/';
            }
        } catch (error) {
            setloading(false)
            if(error.response.status===401){
                seterr('Wrong email or password')
            }else{
                seterr('internal server error')
            }
        }
    }
    return(
        <>
        {loading && <Loading></Loading>}
        <section >
            <Container>
                <Row className="row">
                    <form className="form shadow " onSubmit={handlesubmit} >
                    <Col>
                    <h2>Log In to Your Account!</h2>
                    <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="formGroupExampleInput2" placeholder="enter your email..." required value={form.email} name="email" onChange={handlechange} ref={focus}></input>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="formGroupExampleInput3" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="formGroupExampleInput3" placeholder="enter your password..." value={form.password} name="password" onChange={handlechange} required min={6} ></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign in</button>
                    <p style={{fontWeight:"700"}}>Don't have an account? <Link to='/register' className="link">Sign up</Link></p>
                    {err!=='' &&  <div className="alert alert-danger d-flex align-items-center err" role="alert">{err}</div>}
                    {accept && form.password.length<6 &&  <div className="alert alert-danger d-flex align-items-center err" role="alert">The password field must be at least 6 characters </div>} 
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