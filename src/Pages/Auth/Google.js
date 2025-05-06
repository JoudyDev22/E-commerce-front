// import axios from "axios"
// import { useEffect } from "react"
// import { BaseUrl } from "../../Api/api"
// import { useLocation } from "react-router-dom"

// export default function Google(){
//     const location=useLocation();
//     useEffect(()=>{
//         async function callback(){
//             try{
//             await axios.get(`${BaseUrl}/${Google}${location.search}`)
//             }catch(err){
//                 console.log(err);
//             }
//         }
//         callback()
//     },[]);
//     return(
//         <h1>test</h1>
//     )
// }