import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { Link } from "react-router-dom";
import { USER, USERS } from "../../../Api/api";
import TableShow from "../TableShow";

export default function Users(){
    const [users,setusers]=useState([]);
    const [currentuser,setcurrentuser]=useState('');
    const [Page,setPage]=useState(1);
    const [limit,setlimit]=useState(4);
    const [total,settotal]=useState("")
    const [loading,setloading]=useState(false);
    //get all users
    useEffect(()=>{
        setloading(true)
        Axios.get(`/${USERS}?limit=${limit}&page=${Page}`)
        .then((data)=>{
            setusers(data.data.data)
            settotal(data.data.total)
        })
        .catch((err)=>console.log(err)).finally(()=>setloading(false))
    },[limit,Page])
    //get current user 
    useEffect(()=>{
        Axios.get(`${USER}`)
        .then((data)=>setcurrentuser(data.data))
        .catch((err)=>console.log(err))
    },[])
    //delete 
    async function handledelete(id){
        const result=window.confirm("Are you sure you want to delete this?");
        if(result){
            try{
                Axios.delete(`${USER}/${id}`);
                setusers(users.filter((item)=>item.id !== id))
            }catch(err){
                console.log(err);
            }
        }else{
            console.log('err');
        }
    }
    //info
    const header=[
        {
            key:"name",
            name:"UserName"
        },
        {
            key:"email",
            name:"Email"
        },
        {
            key:"role",
            name:"Role"
        },
        {
            key:'created_at',
            name:"Created At"
        },
        {
            key:"updated_at",
            name:"Login At"
        }
    ]
    return(
        <div className="users w-100 p-2 table-responsive">
        <div className="d-flex align-items-center justify-content-between ">
            <h1 className="p-2">Users Page</h1>
            <Link to={'/dashboard/user/adduser'} className="btn btn-primary">Add User</Link>
        </div>
        <TableShow 
        header={header}
        data={users}
        delete={handledelete}
        currentuser={currentuser}
        Page={Page}
        setPage={setPage}
        limit={limit}
        setlimit={setlimit}
        total={total}
        loading={loading}
        search='name'
        searchlink='user'
        ></TableShow>
    </div>
    )
}  