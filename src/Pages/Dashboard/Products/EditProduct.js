import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CAT, PRO } from "../../../Api/api";
import { Axios } from "../../../Api/axios";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import open from '../../../assist/cloud-2044823_1280.webp';


export default function EditProduct(){
    //states
    const [form,setform]=useState({
        category:"",
        title:"",
        description:"",
        price:"",
        discount:"",
        stock:"0",
        About:"",
    })
    const [categories,setcategories]=useState([]);
    const [images,setimages]=useState([]);
    const [imagesFromServer,setimagesFromServer]=useState([]);
    const [loading,setloading]=useState(false);
    const [serverimgids,setserverimgids]=useState([]);
    const {id}=useParams()
    const nav=useNavigate();
    // useRef
    const openinput=useRef(null);
    const focus=useRef(null);
    const progress=useRef([]);
    const j=useRef(-1);
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
    }
    //get product
    useEffect(()=>{
    Axios.get(`/product/${id}`)
    .then((data)=>{
        setform(data.data[0])
        setimagesFromServer(data.data[0].images)
    }).catch((err)=>console.log(err))
    },[])
    //Edit product
    async function handleEditForm(e){
        setloading(true);
        e.preventDefault();
            try{
                for (let index = 0; index < serverimgids.length; index++) {
                    await Axios.delete(`/product-img/${serverimgids[index]}`)
                    
                }
                await Axios.post(`/${PRO}/edit/${id}`,form);
                nav("/dashboard/products")
            }catch(err){
                setloading(false)
                console.log(err);
            }
        
    }
    //image change & progress
    async function handleImagesChange (e) {
        setimages((prev)=>[...prev,...e.target.files]);
        const imageAsFile=e.target.files;
        const data=new FormData();
        for (let index = 0; index < imageAsFile.length; index++) {
            j.current++;
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
            j.current--;
        }catch(err){
            console.log(err);
        }
    }
    //delete image from server
    async function handleImageDeleteFromServer(id) {
        setimagesFromServer((prev)=>prev.filter((img)=>img.id !==id))
        setserverimgids((prev)=>{return [...prev,id]})
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
    //show images from server
    const showImagesFromServer=imagesFromServer.map((img,index)=>(
        <div className="gap-2 border   p-3 mb-2 "key={index} style={{position:"relative",width:"200px",height:"150px",zIndex:"0"}}>
            <div className="d-flex justify-content-between align-items-start ">
            <div className="d-flex align-items-center  ">
            <img src={img.image} className="img-style"></img>
            </div>
            <div style={{position:"absolute",top:"0",right:"0",zIndex:"1"}}>
            <Button variant="danger" className="mb-4 "style={{cursor:"pointer"}} onClick={()=>handleImageDeleteFromServer(img.id)}>X</Button>
            </div>
        </div>
        </div>
    ))
    return(
        <>
            {loading && <Loading></Loading>}
            <div className='adduser  w-100 p-3'>
            <h1>Edit Product</h1>
            <Form onSubmit={handleEditForm}>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea1">
            <Form.Label className='fs-5 form-label' >Category</Form.Label>
            <Form.Select ref={focus} value={form.category} name="category" onChange={handleFormChange} >
            <option value="" disabled>select category</option>
                {showCategories}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea1"  >
            <Form.Label className='fs-5 form-label'>Title</Form.Label>
            <Form.Control type="text" placeholder='Title...'  name="title" value={form.title} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea2">
            <Form.Label className='fs-5 form-label'>Description:</Form.Label>
            <Form.Control type="text" placeholder="description.." name="description" value={form.description} onChange={handleFormChange}  ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea3">
            <Form.Label className='fs-5 form-label'>Price:</Form.Label>
            <Form.Control type="number" placeholder="price.."   name="price" value={form.price} onChange={handleFormChange} ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea4">
            <Form.Label className='fs-5 form-label'>Discount:</Form.Label>
            <Form.Control type="number" placeholder="discount.."  name="discount" value={form.discount} onChange={handleFormChange} ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea4">
            <Form.Label className='fs-5 form-label'>Stock:</Form.Label>
            <Form.Control type="number" placeholder="stock.."  name="stock" value={form.stock} onChange={handleFormChange} ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea5">
            <Form.Label className='fs-5 form-label'>About:</Form.Label>
            <Form.Control type="text" placeholder="about.."  name="About" value={form.About} onChange={handleFormChange} ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea6" hidden >
            <Form.Label className='fs-5 form-label'>Images:</Form.Label>
            <Form.Control type="file" ref={openinput} multiple onChange={handleImagesChange}></Form.Control>
            </Form.Group>
            <div className="d-flex justify-content-center align-items-center w-100 flex-column rounded mb-3 gap-2 py-2" style={{border:"2px dashed #0086fe",cursor:"pointer"}} onClick={handleOpenInput} >
                <img src={open} alt="upload" width="100px"  ></img>
                <p style={{color:"#0086fe",fontWeight:"bold"}}>Upload Images</p>
            </div>
            <div className="d-flex align-items-start flex-wrap gap-2 " >
                {showImagesFromServer}
            </div>
            <div className="d-flex align-items-start flex-column gap-2 " >
                {showImages}
            </div>
            <Button className='form-button mt-3' type='submit' >Save</Button>
            </Form>
            </div>
            </>
    )
}