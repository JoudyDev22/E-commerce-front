import { Form, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {  Link } from "react-router-dom";
import PaginatedItems from "./Pagination/Pagination"
import { useEffect, useState } from "react";
import { Axios } from "../../Api/axios";
import TransformDate from "../../Helpers/TransformDate";


export default function TableShow(props){
    const currentuser=props.currentuser ||false;
    const [search,setSearch]=useState("");
    const [Date,setDate]=useState("");
    const [searchLoading,setsearchLoading]=useState(false);
    const [searchedData,setSearchedData]=useState([]);
    //filter data
    const filteredDatabyDate=Date.length !== 0? 
    props.data.filter((item)=>TransformDate(item.created_at)===Date):props.data;
    const filteredSearchbyDate=Date.length !==0?
    searchedData.filter((item)=>TransformDate(item.created_at)===Date):searchedData;
    //show data
    const showWichData=search.length>0?filteredSearchbyDate:filteredDatabyDate
    //handleSearch
        async function getSearchedData(){
            try{
            const res=await Axios.post(`${props.searchlink}/search?title=${search}`)
            setSearchedData(res.data);
            }catch(err){
                console.log(err);
            }finally{
                setsearchLoading(false)
            }
        }
        //call function to get searched data
        useEffect(()=>{
            const delay=setTimeout(() => {
                search.length>0 ? getSearchedData():setsearchLoading(false);
            }, 500);
            return ()=>clearTimeout(delay)
        },[search])
    //show header
    const shoeheader=props.header.map((item,index)=>
    (
        <th key={index}>{item.name}</th>
    )
    )
    const showdata=showWichData.map((item,index)=>
        (
        <tr key={index}>
            <td>{index +1}</td>
            {props.header.map((item2,index2)=>
            (
            <td key={index2}>{
                item2.key==='image'?(<img src={"https://ecommerce-back-production-140d.up.railway.app"+ item[item2.key]} alt="img" style={{width:'40px'}}></img>):
                item[item2.key]==='1995'?("Admin"):
                item[item2.key]==='2001'?("User"):
                item2.key==='images'?
                ( <div className="d-flex justify-content-start align-items-center gap-2 flex-row">
                {item[item2.key].map((img,index)=>(
                        <img src={img.image} alt="img" key={index} style={{width:'40px'}}></img>
                    ))}</div>)
                    :item2.key==="created_at"||item2.key==='updated_at'?TransformDate(item[item2.key])
                    :item[item2.key]
            }
            {currentuser&& currentuser.name ===item[item2.key]&& "(you)"}
            </td>))}
            <td>
                <div className="d-flex align-items-center gap-2">
                    <Link to={`${item.id}`}>
                    <FontAwesomeIcon icon={faPenToSquare} fontSize={"19px"} className="text-primary" cursor={"pointer"}></FontAwesomeIcon>
                    </Link>
                    {currentuser.id !==item.id &&
                    <FontAwesomeIcon icon={faTrashCan}
                    fontSize={"19px"} color="red"
                    cursor={"pointer"}
                    onClick={()=>props.delete(item.id)}
                    ></FontAwesomeIcon>}
                </div>
            </td>
        </tr>
    ))
    return(
        <>
        <Form.Control type="search" placeholder="search here..." className="w-50 mb-3" onChange={(e)=>{
            setSearch(e.target.value)
            setsearchLoading(true)
        }
        } ></Form.Control>
        <Form.Control type="date" className="w-50 mb-3" onChange={(e)=>setDate(e.target.value)}></Form.Control>
        <Table striped bordered hover className="table-light shadow-sm  ">
        <thead>
            <tr>
                <th>id</th>
                {shoeheader}
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        {props.loading ?
        ( <tr>
            <td colSpan={12} className="text-center">Loading...</td>
        </tr>):searchLoading?(
            <tr>
            <td colSpan={12} className="text-center">searching...</td>
        </tr>
        ):
        ( showdata)}
        </tbody>
    </Table>
    <div className="d-flex gap-2 flex-wrap  justify-content-end ">
    <Form.Group>
    <Form.Select className="col-2" onChange={(e)=>props.setlimit(e.target.value)}>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
    </Form.Select>
    </Form.Group>
    <PaginatedItems itemsPerPage={props.limit} data={props.data} setPage={props.setPage} Page={props.Page} setlimit={props.setlimit} total={props.total} loading={props.loading}></PaginatedItems>
    </div>
    </>
    )
}
