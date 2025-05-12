import Footer from "../../../Components/Website/Footer/Footer";
import LandingPage from "../LandimgPage/LandingPage";
import LatestProducts from "../Products/LatestProducts/LatestProducts";
import SaleProducts from "../Products/SaleProducts/SaleProducts";
import ShowTopRatedProducts from "../Products/TopRatedProducts/ShowTopRatedProducts";
import AdvertisingSection from "../Sections/AdvertisingSection";
import Services from "../Sections/Services";


export default function HomePage(){
    return(
        <>
        <LandingPage></LandingPage>
        <SaleProducts></SaleProducts>
        <AdvertisingSection></AdvertisingSection>
        <div className="d-flex flex-wrap ">
            <ShowTopRatedProducts></ShowTopRatedProducts>
            <LatestProducts></LatestProducts>
        </div>
        <Services></Services>
        <Footer></Footer>
        </>
        
    )
}