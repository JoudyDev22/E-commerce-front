import { Link } from "react-router-dom";

export default function Err403({role}){
    return(
        <>
        <div className="err-page" >
            <div className="err-title">
            <h1>403-ACCESS DENIED</h1>
            </div>
            <div className="err-txt d-flex flex-column">
            <p>oops, you do not have permission to access this page...</p>
            <Link to={"/"} className="btn btn-danger ">
            {"Go To Home Page"}
            </Link>
            </div>
        </div>
        </>
    )
}