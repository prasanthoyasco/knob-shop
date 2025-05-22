import Hero from "../Components/Hero/Hero"
import NavbarTop from "../Components/Navbar/NavbarTop/NavbarTop"
import ProductCarousel from "../Components/ProductCarousel/ProductCarousel";
import p1 from '../Assets/product-category/p1.png'
import p2 from '../Assets/product-category/p2.png'
import p3 from '../Assets/product-category/p3.png'
import p4 from '../Assets/product-category/p4.png'
import p5 from '../Assets/product-category/p5.png'
import CollectionsCarosal from "../Components/CollectionsCarosal/CollectionsCarosal";
import SingleCarosal from "../Components/singleCarosal/SingleCarosal";
import ShelfHighlight from "../Components/ShelfHighlight/ShelfHighlight";
import CubeCarousel from "../Components/CubeCarousel/CubeCarousel";
import TrendingProducts from "../Components/TrendingProducts/TrendingProducts";
import Footer from '../Components/Footer/Footer';
import Location from '../Components/Location/Location';
import OurServices from '../Components/OurServices/OurServices';
import FAQ from '../Components/FAQ/FAQ';
import Testimonals from '../Components/Testimonals/Testimonals';
import Brand from '../Components/Brand/Brand';

export const Home = () => {
  const products = [
  {
    title: "Clocks",
    count: 24,
    image: p1,
  },
  {
    title: "Drawer Slides",
    count: 25,
    image: p2,
  },
  {
    title: "Digital Locks",
    count: 10,
    image: p3,
  },
  {
    title: "Digital Home locker",
    count: 12,
    image: p4,
  },
  {
    title: "Wardrobes",
    count: 8,
    image: p5,
  },
  {
    title: "Digital Locks",
    count: 10,
    image: p1,
  },
  {
    title: "Digital Home locker",
    count: 12,
    image: p4,
  },
  {
    title: "Wardrobes",
    count: 8,
    image: p5,
  },
  {
    title: "Digital Locks",
    count: 10,
    image: p1,
  },
  {
    title: "Digital Home locker",
    count: 12,
    image: p4,
  },
  {
    title: "Wardrobes",
    count: 8,
    image: p5,
  },
  
];
  return (
  <>
   <NavbarTop/>
      <Hero/>
      <ProductCarousel products={products} />;
      {/* <CollectionsCarosal/> */}
      <CubeCarousel/>
      <ShelfHighlight/>
      <SingleCarosal/>
      <TrendingProducts/>
      <Brand/>
      <Testimonals/>
      <FAQ/>
      <OurServices/>
      <Location/>
      <Footer/>
      </>
  )
}

