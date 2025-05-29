import Hero from "../Components/Hero/Hero"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import NavbarTop from "../Components/Navbar/NavbarTop/NavbarTop"
import ProductCarousel from "../Components/ProductCarousel/ProductCarousel";
import p1 from '../Assets/product-category/p1.png'
import p2 from '../Assets/product-category/p2.png'
import p3 from '../Assets/product-category/p3.png'
import p4 from '../Assets/product-category/p4.png'
import p5 from '../Assets/product-category/p5.png'
import left from '../Assets/left-image-interior.png'
import left1 from '../Assets/left-image-interior1.png'
import right from '../Assets/right-image-interior.png'
import right1 from '../Assets/right-image-interior1.png'
import CollectionsCarosal from "../Components/CollectionsCarosal/CollectionsCarosal";
import SingleCarosal from "../Components/singleCarosal/SingleCarosal";
import ShelfHighlight from "../Components/ShelfHighlight/ShelfHighlight";
import CubeCarousel from "../Components/CubeCarousel/CubeCarousel";
import TrendingProducts from "../Components/TrendingProducts/TrendingProducts";
import Footer from '../Components/Footer/Footer';
import OurServices from '../Components/OurServices/OurServices';
import FAQ from '../Components/FAQ/FAQ';
import Testimonals from '../Components/Testimonals/Testimonals';
import Brand from '../Components/Brand/Brand';
import EssentialsSection from "../Components/EssentialsSection/EssentialsSection";
import LocationMap from "../Components/LocationMap/LocationMap";
import ParallaxSection from "../Components/ParallaxSection/ParallaxSection";
import DealOfTheDay from "../Components/DealOfTheDay/DealOfTheDay";
import ShopTheRoom from "../Components/ShopTheRoom/ShopTheRoom";
import NewHero from "../Components/NewHero/NewHero";
import Sale from "../Components/Sale/Sale";
import LockSlider from "../Components/LockSlider/LockSlider";
import AboutUsGrid from "../Components/AboutUsGrid/AboutUsGrid";
import AboutUs from "../Components/AboutUs/AboutUs";

export const Home = () => {
  useEffect(() => {
  AOS.init({
    duration: 900,       // animation duration
    easing: 'ease-in-out',
    once: true,          // animate only once
    offset: 300          // trigger point from viewport
  });
}, []);

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
   {/* <Navbar/> */}
     <div data-aos="fade-up" data-aos-delay="0" ><NewHero /></div>
      {/* <LockSlider/> */}
     <div data-aos="fade-up" data-aos-delay="100" ><ProductCarousel products={products} /></div>
      {/* <CollectionsCarosal/> */}
      <div data-aos="fade-up" data-aos-delay="100"><CubeCarousel /></div>
      <div data-aos="fade-up" data-aos-delay="100"><ShelfHighlight /></div>
      <div data-aos="fade-up" data-aos-delay="200"><SingleCarosal /></div>
<div data-aos="fade-up" data-aos-delay="400"><TrendingProducts /></div>
<div data-aos="fade-up" data-aos-delay="100"><EssentialsSection /></div>
<div data-aos="fade-up" data-aos-delay="100">
  <ParallaxSection
    rotation={10}
    title="Check over 50,000 Products"
    subtitle="See our latest inspirations"
    buttonText="Check now"
    buttonLink="/pages/inspired"
    leftImage={left}
    rightImage={right}
    leftImage1={left1}
    rightImage1={right1}
  />
</div>
<div data-aos="fade-right" data-aos-delay="100"><DealOfTheDay /></div>
<div data-aos="fade-up" data-aos-delay="100"><ShopTheRoom /></div>
<div data-aos="fade-up" data-aos-delay="100"><Brand /></div>
<div data-aos="fade-up" data-aos-delay="100"><Testimonals /></div>
<div data-aos="fade-up" data-aos-delay="100"><AboutUs /></div>
      {/* <AboutUsGrid/> */}
      <div data-aos="fade-up" data-aos-delay="100" data-aos-offset="500"><Sale /></div>
<div data-aos="fade-up" data-aos-delay="100"><FAQ /></div>
<div data-aos="fade-up" data-aos-delay="100"><OurServices /></div>
<div data-aos="fade-up" data-aos-delay="100"><LocationMap /></div>
<div data-aos="fade-up" data-aos-delay="100"><Footer /></div>
      </>
  )
}

