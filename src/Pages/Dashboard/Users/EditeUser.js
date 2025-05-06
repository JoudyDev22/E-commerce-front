import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Axios } from '../../../Api/axios';
import { USER } from '../../../Api/api';
import { Button } from 'react-bootstrap';
import Loading from '../../../Components/Loading/Loading';
import { replace, useNavigate, useParams } from 'react-router-dom';

export default function EditeUser(){
    //user states
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [role,setrole]=useState("");
    const [disable,setdisable]=useState(true);
    const [loading,setloading]=useState(false);
    const [accept,setaccept]=useState(false);
    const nav=useNavigate();
    //id
    const {id}=useParams();
    console.log(id);
    //get current user info
    useEffect(()=>{
    setloading(true);
    Axios.get(`/${USER}/${id}`).then(data=>{
        setemail(data.data.email)
        setname(data.data.name)
        setrole(data.data.role)
        setloading(false)
    }).then(()=>{
        setdisable(false);
    }).catch(()=>nav("/dashboard/users/page/kk",{replace:true}))
    },[])
    //handleEdite
    async function handleEdite(e){
        setloading(true);
        setaccept(true);
        e.preventDefault();
        try{
            await Axios.post(`${USER}/edit/${id}`,{
                name:name,
                email:email,
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
        <div className='adduser w-100 p-3'>
        <h1>Edit User</h1>
        <Form onSubmit={handleEdite} >
        <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea1">
        <Form.Label className='form-label fs-5'>Name:</Form.Label>
        <Form.Control type="text" placeholder='name...' value={name} onChange={(e)=>setname(e.target.value)} readOnly />
        
        </Form.Group>
        <Form.Group className="mb-3 " controlId="exampleForm.ControlInput2">
        <Form.Label className='form-label fs-5'>Email:</Form.Label>
        <Form.Control type="email" placeholder='email...' value={email} readOnly onChange={(e)=>setemail(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3 " controlId="exampleForm.ControlInput3">
        <Form.Label className='form-label fs-5'>Role:</Form.Label>
        <Form.Select value={role}  onChange={(e)=>setrole(e.target.value)}>
            <option value="" disabled >Select Role</option>
            <option value='1995'>Admin</option>
            <option value='2001'>User</option>
            </Form.Select>
            </Form.Group>
        <Button className='form-button' type='submit' disabled={disable}>Save</Button>
        </Form>
        </div>
        </>
    )
}