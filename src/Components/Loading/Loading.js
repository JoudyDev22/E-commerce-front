export default function Loading(){
    return(
        <>
        <div className="d-flex justify-content-center spinner-container">
        <div className="spinner-border text-primary" style={{width:"3rem",height:"3rem"}} role="status">
        <span className="visually-hidden">Loading...</span>
        </div>
        </div>
        </>
    )
}