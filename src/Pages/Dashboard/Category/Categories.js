import { Link } from "react-router-dom";
import TableShow from "../TableShow";
import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { CAT, CATEGORY } from "../../../Api/api";


export default function Categories(){
    //states
    const [categories,setcategories]=useState([]);
    const [limit,setlimit]=useState(4);
    const [Page,setPage]=useState(1);
    const [total,settotal]=useState("")
    const [loading,setloading]=useState(false);
    //get all categories
    useEffect(()=>{
        setloading(true)
        Axios.get(`/${CAT}?limit=${limit}&page=${Page}`)
    .then((data)=>{
        setcategories(data.data.data)
        settotal(data.data.total)
        console.log(data.data);})
    .catch((err)=>console.log(err)).finally(()=>setloading(false));
    },[limit,Page])
    //header 
    const header=[
        {
            key:"title",
            name:"Title"
        },
        {
            key:"image",
            name:"Image"
        },
        {
            key:'created_at',
            name:"Created At"
        },
        {
            key:"updated_at",
            name:"Updated At"
        }
    ]
    //delete Category
    async function handledelete(id){
        const result=window.confirm("Are you sure you want to delete this?");
        if(result){
            try{
                await Axios.delete(`/${CATEGORY}/${id}`);
                setcategories(categories.filter((item)=>item.id !==id))
            }catch(err){
                console.log(err);
            }
        }else{
            console.log('err')
        }
    }
    return (
            <div className="users w-100 p-2 table-responsive">
                <div className="d-flex align-items-center justify-content-between">
                    <h1 className="p-2">Categories Page</h1>
                    <Link to={'/dashboard/addcat'} className="btn btn-primary">Add Category</Link>
                </div>
                <TableShow 
                limit={limit}
                setlimit={setlimit}
                Page={Page}
                setPage={setPage}
                header={header}
                data={categories}
                total={total}
                loading={loading}
                delete={handledelete}
                search='title'
                searchlink='category'
                ></TableShow>
            </div>
    )
}