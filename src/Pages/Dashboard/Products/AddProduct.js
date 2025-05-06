import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CAT, PRO } from "../../../Api/api";
import { Axios } from "../../../Api/axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import open from '../../../assist/cloud-2044823_1280.webp';


export default function AddProduct(){
    //states
    const [form,setform]=useState({
        category:"",
        title:"",
        description:"",
        price:"",
        discount:"",
        About:"",
    })
    //dummy form
    const dummyForm={
        category:null,
        title:"dummy",
        description:"dummy",
        price:"33",
        discount:"33",
        About:"dummy"
    }
    const [categories,setcategories]=useState([]);
    const [images,setimages]=useState([]);
    const [loading,setloading]=useState(false);
    const [sent,setsent]=useState(false);
    const [id,setid]=useState("");
    const nav=useNavigate();
    // useRef
    const openinput=useRef(null);
    const focus=useRef(null);
    const progress=useRef([]);
    
    const ids=useRef([]);
    //handle open input
    function handleOpenInput(){
        openinput.current.click();
    }
    //focus
    useEffect(()=>{
        focus.current.focus();
    },[])
    //handleFormChange
    function handleFormChange(e){
        setform({...form,[e.target.name]:e.target.value});
        setsent(true);
        if(sent !==1){
            handleAddProduct();
        }
    }
    //create product 
    async function handleAddProduct(){
        try{
        const res=await Axios.post(`/${PRO}/add`,dummyForm);
        setid(res.data.id);
        }catch(err){
            console.log(err);
        }
    }
    //Edit product
    async function handleEditForm(e){
        setloading(true);
        e.preventDefault();
        try{
            await Axios.post(`/${PRO}/edit/${id}`,form);
            nav("/dashboard/products")
        }catch(err){
            setloading(false)
            console.log(err);
        }
    }
    const j=useRef(-1);
    //image change & progress
    async function handleImagesChange (e) {
        setimages((prev)=>[...prev,...e.target.files]);
        const imageAsFile=e.target.files;
        const data=new FormData();
        for (let index = 0; index < imageAsFile.length; index++) {
            ++j.current;
            data.append("image",imageAsFile[index]);
            data.append("product_id",id);
            try{
            const res=await Axios.post('/product-img/add',data,{
                onUploadProgress:(ProgressEvent)=>{
                    const {total,loaded}=ProgressEvent;
                    const percent=Math.floor((loaded *100)/total);
                    if(percent %10 ===0){
                        progress.current[j.current].style.width=`${percent}%`;
                        progress.current[j.current].setAttribute(
                            "percent",
                            `${percent}%`
                        )
                    }
                }
            }
        )
        ids.current[j.current]=res.data.id;
        console.log(res);
    }catch(err){
        console.log(err);
    }
}
}
    //delete image
    async function handleImageDelete(image,id) {
        const findid=ids.current[id];
        try{
            const res=await Axios.delete(`/product-img/${findid}`);
            setimages(prev=>prev.filter((img)=>img !==image));
            ids.current=ids.current.filter((i)=>i !==findid);
            --j.current;
        }catch(err){
            console.log(err);
        }
    }
    //get categories
    useEffect(()=>{
        Axios.get(`/${CAT}`)
        .then((data)=>setcategories(data.data))
        .catch((err)=>console.log(err))
    },[])
    //show categories
    const showCategories=categories.map((cat,index)=>
        <option key={index} value={cat.id}>{cat.title}</option>
    )
    //show images
    const showImages=images.map((img,index)=>(
        <div className="gap-2 border w-100 p-3 mb-2 "key={index}>
            <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-start  ">
            <img src={URL.createObjectURL(img)} style={{width:"90px"}}></img>
            <div className="mx-2">
            <p className="mb-1 img-name ">{img.name}</p>
            <p className="mb-1 img-size">size: {(img.size/1024 <900)?((img.size/1024).toFixed(2)+"KB"):((img.size/(1024*1024)).toFixed(2)+"MB")}</p>
            </div>
            </div>
            <Button variant="danger" className="mb-4" onClick={()=>handleImageDelete(img,index)}>Delete</Button>
        </div>
        <div className="custom-progress" >
            <span className="inner-progress" ref={(e)=>progress.current[index]=e} ></span>
        </div>
        </div>
    ))
    return(
        <>
            {loading && <Loading></Loading>}
            <div className='adduser  w-100 p-3'>
            <h1>Add Product</h1>
            <Form onSubmit={handleEditForm}>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea1">
            <Form.Label className='fs-5 form-label' >Category</Form.Label>
            <Form.Select ref={focus} value={form.category} name="category" onChange={handleFormChange} required>
            <option value="" disabled>select category</option>
                {showCategories}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea1"  >
            <Form.Label className='fs-5 form-label'>Title</Form.Label>
            <Form.Control type="text" placeholder='Title...'  name="title" value={form.title} onChange={handleFormChange} required disabled={!sent} />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea2">
            <Form.Label className='fs-5 form-label'>Description:</Form.Label>
            <Form.Control type="text" placeholder="description.." name="description" value={form.description} onChange={handleFormChange} disabled={!sent} required></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea3">
            <Form.Label className='fs-5 form-label'>Price:</Form.Label>
            <Form.Control type="number" placeholder="price.."   name="price" value={form.price} onChange={handleFormChange} disabled={!sent} required></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea4">
            <Form.Label className='fs-5 form-label'>Discount:</Form.Label>
            <Form.Control type="number" placeholder="discount.."  name="discount" value={form.discount} onChange={handleFormChange} disabled={!sent} required></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea5">
            <Form.Label className='fs-5 form-label'>About:</Form.Label>
            <Form.Control type="text" placeholder="about.."  name="About" value={form.About} onChange={handleFormChange} disabled={!sent} required></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea6" hidden >
            <Form.Label className='fs-5 form-label'>Images:</Form.Label>
            <Form.Control type="file" ref={openinput} multiple disabled={!sent} onChange={handleImagesChange}></Form.Control>
            </Form.Group>
            <div className="d-flex justify-content-center align-items-center w-100 flex-column rounded mb-3 gap-2 py-2" style={{border:!sent?"2px dashed gray":"2px dashed #0086fe",cursor:sent &&"pointer"}} onClick={handleOpenInput} >
                <img src={open} alt="upload" width="100px" style={{filter:!sent &&"grayscale(1)"}} ></img>
                <p style={{color:!sent?"gray":"#0086fe",fontWeight:"bold"}}>Upload Images</p>
            </div>
            <div className="d-flex align-items-start flex-column gap-2 " >
                {showImages}
            </div>
            <Button className='form-button mt-3' type='submit' >Add</Button>
            </Form>
            </div>
            </>
    )
}

