import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { CATEGORY } from "../../../Api/api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

export default function EditeCategory(){
    //states
    const [title,settitle]=useState("");
    const [image,setimage]=useState("");
    const [loading,setloading]=useState(false);
    const nav=useNavigate();
    const {id}=useParams()
    //get Category
    useEffect(()=>{
    setloading(true)
    Axios.get(`/${CATEGORY}/${id}`)
    .then((data)=>settitle(data.data.title))
    .then(()=>setloading(false))
    .catch(()=>nav('/dashboard/categories/page/kk',{replace:true}))
    },[])
    //edite function
    async function handlesubmit(e) {
        e.preventDefault();
        setloading(true)
        const form=new  FormData();
        form.append("title",title);
        form.append("image",image);
        try{
        await Axios.post(`/${CATEGORY}/edit/${id}`,form);
        nav('/dashboard/categories')
        }catch(err){
        setloading(false)
        console.log(err);
        }
    }
    return(
        <>
        {loading &&<Loading></Loading>}
        <div className='adduser w-100 p-3'>
        <h1>Edit Category</h1>
        <Form  onSubmit={handlesubmit}>
        <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea1">
        <Form.Label className='form-label fs-5'>Title:</Form.Label>
        <Form.Control type="text" placeholder='title...' value={title} onChange={(e)=>settitle(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea2">
        <Form.Label className='form-label fs-5'>Image:</Form.Label>
        <Form.Control type="file" placeholder='image...' onChange={(e)=>setimage(e.target.files.item(0))} />
        </Form.Group>
        <Button className='form-button' type='submit' >Save</Button>
        </Form>
        </div>
        </>
    )
}