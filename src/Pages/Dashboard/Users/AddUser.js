import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Axios } from '../../../Api/axios';
import { USER } from '../../../Api/api';
import { Button } from 'react-bootstrap';
import Loading from '../../../Components/Loading/Loading';
import { useNavigate } from 'react-router-dom';

export default function AddUser(){
        //user states
        const [name,setname]=useState("");
        const [email,setemail]=useState("");
        const [password,setpassword]=useState("");
        const [role,setrole]=useState("");
        const [disabled,setdisabled]=useState(true);
        const [loading,setloading]=useState(false);
        const [accept,setaccept]=useState(false);
        //Ref
        const focus=useRef(null);
       //handle focus
        useEffect(()=>{
        focus.current.focus();
        },[])
        const nav=useNavigate();
        //Add user
        async function handleAdd(e){
            setloading(true);
            setaccept(true);
            e.preventDefault();
            try{
                await Axios.post(`${USER}/add`,{
                    name:name,
                    email:email,
                    password:password,
                    role:role,
                });
                nav('/dashboard/users');
            }catch(err){
                setloading(false);
                console.log(err);
            }
        }
        return(
            <>
            {loading &&<Loading></Loading>}
            <div className='adduser  w-100 p-3'>
            <h1>Add User</h1>
            <Form onSubmit={handleAdd}>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea1">
            <Form.Label className='fs-5 form-label'>Name:</Form.Label>
            <Form.Control type="text" placeholder='name...' value={name} onChange={(e)=>setname(e.target.value)} ref={focus}/>
            {accept && name ==="" && <div className="alert alert-danger d-flex align-items-center err" role="alert" >Name is required</div>}
            </Form.Group>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput2">
            <Form.Label className=' fs-5'>Email:</Form.Label>
            <Form.Control type="email" placeholder='email...' value={email} required onChange={(e)=>setemail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput3">
            <Form.Label className=' fs-5'>Password:</Form.Label>
            <Form.Control type="password" placeholder='password...' value={password} required onChange={(e)=>setpassword(e.target.value)}/>
            {accept && password.length<6 && <div className="alert alert-danger d-flex align-items-center err" role="alert">The password field must be at least 6 characters</div>}
            </Form.Group>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput4">
            <Form.Label className=' fs-5'>Role:</Form.Label>
            <Form.Select value={role}  onChange={(e)=>setrole(e.target.value)} required>
                <option value="" disabled >Select Role</option>
                <option value='1995'>Admin</option>
                <option value='2001'>User</option>
                </Form.Select>
                </Form.Group>
            <Button className='form-button' type='submit' disabled={
                name.length<1
                && email.length<1
                &&password.length<6
                &&role===""?disabled:false}>Add</Button>
            </Form>
            </div>
            </>)
}