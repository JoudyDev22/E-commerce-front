import banner from '../../../assist/cta-banner-tHRN5P0l (2).jpg';
import photo1 from '../../../assist/testimonial-1-TwRg8cDT.jpg';
import photo2 from '../../../assist/download.svg';
import { Col, Container, Row } from 'react-bootstrap';


export default function Services(){
    return(
        <>
        <div className=" mt-5 d-flex w-100 mb-4 "style={{minHeight:"100vh"}}>
            <Container>
                <Row className='align-items-center'>
                    <Col xs={12} md={6}>
                <h1 className='fs-4' >Testimonial</h1>
                <div className='s-card '>
                <div className='d-flex flex-column justify-content-center align-items-center' >
                    <img src={photo1} alt='img' className='rounded-circle w-50 img-fluid'></img>
                    <h3 className='fw-bold fs-5'>ALAN DOE</h3>
                    <p style={{color:"rgb(107 114 128)"}}>CEO & Founder Invision</p>
                    <img src={photo2} alt='img' className='img-fluid' style={{width:"40px"}}></img>
                    <p className='text-center'>Lorem ipsum dolor sit<br></br> amet consectetur Lorem ipsum<br></br> dolor dolor sit amet.</p>
                </div>
            </div>
                    </Col>
                    <Col xs={12} md={6}>
                    <div className='img-card'>
                    <img src={banner} alt='banner' className='img-fluid w-100'></img>
                    <div className='img-card-span'>
                    <span className='bg-dark text-white p-2 fw-bold '>25% DISCOUNT</span>
                    <h3 className='fs-5'>Summer Collection</h3>
                    <p className='fs-5'>Starting @ $10</p>
                    <h3 className='fs-5'>SHOP NOW</h3>
                    </div>
            </div>
                    </Col>
                </Row>
            </Container>
        </div>
            
            </>
    )
}