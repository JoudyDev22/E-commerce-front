import { Button } from 'react-bootstrap';
import './Sections.css';
export default function AdvertisingSection(){
    return(
        <>
        <div className='ad-section' >
                <div className='list'>
                <h1 className=' text-center'>Trending item</h1>
            <p className=' fs-1 text1'>Women's<br></br> latest fashion sale</p>
            <p className=' fs-2 text2'>starting at $<span className='text-dark fw-bold'>20.00</span></p>
            <Button className='btn-show'>SHOP NOW</Button>
            </div>
        
        </div>
        </>
    )
}