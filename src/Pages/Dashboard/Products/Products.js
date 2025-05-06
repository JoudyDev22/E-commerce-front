import { Link } from "react-router-dom";
import TableShow from "../TableShow";
import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { PRO, PRODUCTS } from "../../../Api/api";

export default function Products(){
    const [products,setproducts]=useState([]);
    const [Page,setPage]=useState(1);
    const [limit,setlimit]=useState(4);
    const [total,settotal]=useState("")
    const [loading,setloading]=useState(false);
    //get all products
    useEffect(()=>{
        setloading(true)
        Axios.get(`/${PRODUCTS}?limit=${limit}&page=${Page}`)
        .then((data)=>{
            setproducts(data.data.data)
            settotal(data.data.total)
        })
        .catch((err)=>console.log(err)).finally(()=>setloading(false))
    },[limit,Page])
    console.log(products);
    //delete product
    async function handledelete(id){
        const result=window.confirm("Are you sure you want to delete this?");
        if(result){
            try{
                await Axios.delete(`/${PRO}/${id}`);
                setproducts(products.filter((item)=>item.id !== id))
            }catch(err){
            console.log(err);
            }
        }else{
            console.log("err");
        }
    }
    //header
    const header=[
        {
        key:"images",
        name:"Images"
        },
        {
        key:"title",
        name:"Title"
        },
        {
        key:"description",
        name:"Description"
        },
        {
        key:"price",
        name:"Price"
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
    return(
        <div className="users w-100 p-2 table-responsive">
                        <div className="d-flex align-items-center justify-content-between">
                            <h1 className="p-2">Products Page</h1>
                            <Link to={'/dashboard/addpro'} className="btn btn-primary">Add Product</Link>
                        </div>
                        <TableShow 
                        header={header}
                        data={products}
                        delete={handledelete}
                        Page={Page}
                        setPage={setPage}
                        limit={limit}
                        setlimit={setlimit}
                        total={total}
                        loading={loading}
                        search='title'
                        searchlink='product'
                        ></TableShow>
                    </div>
    )
}