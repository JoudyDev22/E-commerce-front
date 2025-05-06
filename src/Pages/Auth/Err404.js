import { Link } from "react-router-dom";

export default function Err404(){
    return(
        <>
            <div className="error">
                <div className="container-floud">
                    <div className="col-xs-12 ground-color text-center">
                        <div className="container-error-404">
                            <div className="clip"><div className="shadow"><span className="digit thirdDigit">4</span></div></div>
                            <div className="clip"><div className="shadow"><span className="digit secondDigit">0</span></div></div>
                            <div className="clip"><div className="shadow"><span className="digit firstDigit">4</span></div></div>
                            <div className="msg">OH!<span className="triangle"></span></div>
                        </div>
                        <div>
                        <h2 className="h1">Sorry! Page not found</h2>
                        <Link to="/" className="btn btn-danger ">Go To Home Page</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}