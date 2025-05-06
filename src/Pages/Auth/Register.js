import { Col, Container, Row } from "react-bootstrap";
import register from '../../assist/login-bg.svg';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BaseUrl, REGISTER } from "../../Api/api";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import Cookie from 'cookie-universal';


export default function Register(){
    //form useState
    const [form,setform]=useState({
        name:"",
        email:"",
        password:""
    })
    //Ref
    const focus=useRef(null);
    //handle focus
    useEffect(()=>{
        focus.current.focus();
        },[])
    //navigate
    const navigate=useNavigate();
    //useState
    const [loading,setloading]=useState(false);
    const [accept,setaccept]=useState(false);
    const [emailerror,setemailerror]=useState('');
    //cookie
    const cookie=Cookie();
    //handlechange
    function handlechange(e){
    setform({...form,[e.target.name]:e.target.value})
    }
    //handlesubmit
    async function handlesubmit(e){
        let flag=true;
        e.preventDefault();
        setloading(true);
        setaccept(true);
        if(form.name==="" || form.password.length<6){
            flag=false;
            setloading(false)
        }else{
            flag=true;
            setloading(true);
        }
            try{
            if(flag){
                const res=await axios.post(`${BaseUrl}/${REGISTER}`,form);
                const token=res.data.token;
                console.log(res);
                cookie.set("e-commerce",token);
                setloading(false);
                navigate("/")
            } }catch(error){
                setloading(false);
                setemailerror(error.response.status)
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
                    <h2>Create your account</h2>
                    <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Name:</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="enter your name..." value={form.name} name="name" onChange={handlechange} ref={focus}></input>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="formGroupExampleInput2" placeholder="enter your email..." required value={form.email} name="email" onChange={handlechange}></input>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="formGroupExampleInput3" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="formGroupExampleInput3" placeholder="enter your password..." value={form.password} name="password" onChange={handlechange}  min={6} ></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <p style={{fontWeight:"700"}}>Alreay have account? <Link to='/login' className="link">Login</Link></p>
                    {accept && form.name==='' &&  <div className="alert alert-danger d-flex align-items-center err" role="alert">Name is required</div>}
                    {accept && emailerror===422 &&  <div className="alert alert-danger d-flex align-items-center err" role="alert">email has already been taken</div>}
                    {accept && form.password.length<6 && <div className="alert alert-danger d-flex align-items-center err" role="alert">The password field must be at least 6 characters</div>}
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