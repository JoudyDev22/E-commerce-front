import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { CATEGORY } from "../../../Api/api";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function AddCategory(){
    //states
    const [title,settitle]=useState("");
    const [image,setimage]=useState("");
    const [disable,setdisable]=useState(true);
    const [loading,setloading]=useState(false);
    //Ref
    const focus=useRef(null);
    //handle focus
    useEffect(()=>{
            focus.current.focus();
        },[])
    const nav=useNavigate();
    //add function
    async function handlesubmit(e) {
        setloading(true);
        e.preventDefault();
        const form=new FormData();
        form.append("title",title);
        form.append('image',image);
        try{
        await Axios.post(`/${CATEGORY}/add`,form);
        nav('/dashboard/categories');
        }catch(err){
            setloading(false);
            console.log(err)
        }
    }
    return(
        <>
        {loading && <Loading></Loading>}
            <div className='adduser  w-100 p-3'>
            <h1>Add Category</h1>
            <Form  onSubmit={handlesubmit}>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea1">
            <Form.Label className='fs-5 form-label'>Title</Form.Label>
            <Form.Control type="text" placeholder='Title...'  value={title} onChange={(e)=>settitle(e.target.value)} ref={focus}/>
            </Form.Group>

            <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea2">
            <Form.Label className='fs-5 form-label'>Image:</Form.Label>
            <Form.Control type="file" placeholder="image.."  onChange={(e)=>setimage(e.target.files.item(0))}></Form.Control>
            </Form.Group>
            <Button className='form-button' type='submit' disabled={title.length===0?disable:false} >Add</Button>
            </Form>
            </div>
            </>
    )
}