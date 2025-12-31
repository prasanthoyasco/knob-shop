import Hero from "../Components/Hero/Hero";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import NavbarTop from "../Components/Navbar/NavbarTop/NavbarTop";
import ProductCarousel from "../Components/ProductCarousel/ProductCarousel";
import dSlides1 from "../Assets/Product Categories and its Product (Knobs Shop)/product img/product img/Drawer Slides/YCDS-SC-10 (XX)/YCDS-SC-10 (XX).webp";
import dSlides2 from "../Assets/Product Categories and its Product (Knobs Shop)/product img/product img/Drawer Slides/YCDS-SC-12 (XX)/YCDS-SC-12 (XX).webp";
import p1 from "../Assets/product-category/p1.png";
import p2 from "../Assets/product-category/p2.png";
import p3 from "../Assets/product-category/p3.png";
import p4 from "../Assets/product-category/p4.png";
import p5 from "../Assets/product-category/p5.png";
import left from "../Assets/left-image-interior.png";
import left1 from "../Assets/left-image-interior1.png";
import right from "../Assets/right-image-interior.png";
import right1 from "../Assets/right-image-interior1.png";
import CollectionsCarosal from "../Components/CollectionsCarosal/CollectionsCarosal";
import SingleCarosal from "../Components/singleCarosal/SingleCarosal";
import ShelfHighlight from "../Components/ShelfHighlight/ShelfHighlight";
import CubeCarousel from "../Components/CubeCarousel/CubeCarousel";
import TrendingProducts from "../Components/TrendingProducts/TrendingProducts";
import Footer from "../Components/Footer/Footer";
import OurServices from "../Components/OurServices/OurServices";
import FAQ from "../Components/FAQ/FAQ";
import Testimonals from "../Components/Testimonals/Testimonals";
import Brand from "../Components/Brand/Brand";
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
import MeshPinImage from "../Assets/Product Categories and its Product (Knobs Shop)/product img/product img/Wardrobe Door Lock/Mesh Pin/mesh pin.webp";
import ML81PAV from "../Assets/Product Categories and its Product (Knobs Shop)/product img/product img/Wardrobe Door Lock/ML81PAV/ML81PAV.webp";
import ML81PAH from "../Assets/Product Categories and its Product (Knobs Shop)/product img/product img/Wardrobe Door Lock/ML81PAH/ML81PAH.webp";
import YMI70AYHImage from "../Assets/Product Categories and its Product (Knobs Shop)/Smart Door Lock/Smart Door Lock/YMI70A-YH/YMI70_RED-GOLD-01.jpg";
import fwl1 from "../Assets/Product Categories and its Product (Knobs Shop)/product img/product img/Fingerprint Wardrobe Lock/FP-OP-F- B-02/FP-OP-F- B-02.webp";
import fwl2 from "../Assets/Product Categories and its Product (Knobs Shop)/product img/product img/Fingerprint Wardrobe Lock/FP-OP-H- B-01/FP-OP-H- B-01.webp";
import fwl3 from "../Assets/Product Categories and its Product (Knobs Shop)/product img/product img/Fingerprint Wardrobe Lock/FP-SL-F-B- 02/FP-SL-F-B- 02.webp";
import lunaProImage from "../Assets/Product Categories and its Product (Knobs Shop)/Smart Door Lock/Smart Door Lock/Luna Pro+ Facial/1_3819cf62-66f2-4a8a-b562-eddb7d96a57c.webp";
import yaleImage from "../Assets/Product Categories and its Product (Knobs Shop)/Smart Door Lock/Smart Door Lock/Luna Pro+ Facial/14_0fb7187f-b413-411d-a145-e62b8c9e41bb.jpg";
import ds1 from "../Assets/Product Categories and its Product (Knobs Shop)/product img/product img/Digital Safes  - category/Fire Rated Biometric Firesafe (125TFL)/Fire Rated Biometric Firesafe (125TFL).webp";
import ds2 from "../Assets/Product Categories and its Product (Knobs Shop)/product img/product img/Digital Safes  - category/Fire Rated Biometric Firesafe (530TFL)/Fire Rated Biometric Firesafe (530TFL).webp";
// import image1 from "../Assets/categoryBanner/wardrobeDoorLock.jpg";
// import image2 from "../Assets/categoryBanner/wardrobefingerprint.webp";
import image3 from "../Assets/categoryBanner/smartSafe.webp";
import image4 from "../Assets/categoryBanner/DigitalDoorLock.webp";
import image5 from '../Assets/CategoriesImge/Knob Shop/clock.jpg'
import image6 from '../Assets/CategoriesImge/Knob Shop/wardrobes.jpg'
import { fetchCategories } from "../API/categoriesApi"; 
import cat1 from '../Assets/New folder/New folder/01.png'
import cat2 from '../Assets/New folder/New folder/02.png'
import cat3 from '../Assets/New folder/New folder/3.png'
import cat7 from '../Assets/New folder/New folder/7.png'
import cat8 from '../Assets/CategoriesImge/Knob Shop/sec-2.png'
import cat10 from '../Assets/CategoriesImge/Knob Shop/Hexa bolt.png'
import cat9 from '../Assets/CategoriesImge/Knob Shop/black-rim.png'
import aldrops from '../Assets/Explore Our Product Range/Explore Our Product Range/Logos/Aldrop (1).png'
import Crystal from '../Assets/New folder/New folder/Crystal Collection.png'
import DoorCloser from '../Assets/New folder/New folder/Door Closer.png'
import DoorStopper from '../Assets/Explore Our Product Range/Explore Our Product Range/Logos/Door_stopper.png'
import hinges from '../Assets/Explore Our Product Range/Explore Our Product Range/Logos/Hinges(02).png'
import lockcollections from '../Assets/New folder/New folder/lock collections.png'
import Rimlock from '../Assets/Explore Our Product Range/Explore Our Product Range/Logos/Rim_lock(01).png'
import sofalegs from '../Assets/New folder/New folder/sofa legs.png'
import Telescopic from '../Assets/Explore Our Product Range/Explore Our Product Range/Logos/Telescopic(1).png'
import Brackets from '../Assets/New folder/New folder/Brackets.png'
import hooks from '../Assets/New folder/New folder/hooks.png'
import doorKnoker from '../Assets/Explore Our Product Range/Explore Our Product Range/Logos/Door knockers.jpg'
import Tower from '../Assets/Explore Our Product Range/Explore Our Product Range/Logos/Tower_bolt.png'
import { useLocation } from "react-router-dom";
import ScrollEffectSection from "../Components/ScrollEffectSection/ScrollEffectSection";
export const Home = () => {
  const [categories, setCategories] = useState([]);
    const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToContact) {
      const section = document.getElementById("contact-section");
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 300); // small delay to ensure DOM is ready
      }
    }
  }, [location]);
  const categoryImageMap = {
    "Door Closer":DoorCloser,
    "Rim Lock":Rimlock,
    "Door Stopper": DoorStopper,
    "Telescopic": Telescopic,
    "Auto HInges": cat3,
    "Aldrop": aldrops,
    "Hinges":hinges,
    "Sofa Leg":cat10,
    "Hooks":hooks,
    "Brackets":Brackets,
    "Crystal collections":Crystal,
    "Lock collections":lockcollections,
    "Tower Bolt":Tower,
    "Door Knocker":doorKnoker,
    
  };
  
  const TARGET_CATEGORY_NAMES = [
    "Door Closer",
    "Door Stopper",
    "Tower Bolt",
    "Telescopic",
    "Auto HInges",
    "Aldrop",
    "Hinges",
    "Rim Lock",
    "Sofa Leg",
    "Hooks",
    "Brackets",
    "Crystal collections",
    "Lock collections",
    "Door Knocker",
  ];
  useEffect(() => {
    const getSelectedCategories = async () => {
      try {
        const data = await fetchCategories();
        const selected = data
          .filter(cat => TARGET_CATEGORY_NAMES.includes(cat.category_name))
          .map(cat => ({
            id : cat._id,
            text: cat.category_name,
            count: cat.productCount,
            image: categoryImageMap[cat.category_name] || cat.categoryImageUrl,
            bannerImage: cat.categoryImageUrl,
            productList: [] // optional
          }));
        setCategories(selected);
      } catch (err) {
        console.error("Error fetching selected categories", err);
      }
    };
  
    getSelectedCategories();
  }, []);



  useEffect(() => {
    AOS.init({
      duration: 900, // animation duration
      easing: "ease-in-out",
      once: true, // animate only once
      offset: 100, // trigger point from viewport
    });
  }, []);

  const products = [
    {
      text: "Aldrop",
      count: 24,
      image: p1,
      bannerImage: image5,
    },
    {
      text: "Drawer Slides",
      count: 25,
      image: p2,
      bannerImage: image3,
      productList: [
        {
          name: "YCDS-SC-10",
          image: dSlides1,
        },
        {
          name: "YCDS-SC-12",
          image: dSlides2,
        },
      ],
    },
    {
      text: "Digital Locks",
      count: 10,
      image: p3,
      bannerImage: image4,
      productList: [
        {
          name: "YDME 200NxT",
          image: lunaProImage,
        },
        {
          name: "YDME 100NxT",
          image: yaleImage,
        },
        {
          name: "YDME 50NxT",
          image: YMI70AYHImage,
        },
        {
          name: "YDME 50Pro",
          image: YMI70AYHImage,
        },
        {
          name: "REFLECTA Lock",
          image: YMI70AYHImage,
        },
      ],
    },
    {
      text: "Digital Home locker",
      count: 12,
      image: p4,
      bannerImage: image3,
      productList: [
        {
          name: "Fire Rated Biometric Firesafe (125TFL)",
          image: ds1,
        },
        {
          name: "Fire Rated Biometric Firesafe (530TFL)",
          image: ds2,
        },
      ],
    },
    {
      text: "Wardrobes",
      count: 8,
      image: p5,
      bannerImage: image6,
      productList: [
        {
          name: "Mesh Pin",
          image: MeshPinImage,
        },
        {
          name: "ML81PAH",
          image: ML81PAH,
        },
        {
          name: "ML81PAV",
          image: ML81PAV,
        },
      ],
    },
    {
      text: "Digital Locks",
      count: 10,
      image: p1,
      bannerImage: image4,
      productList: [
        {
          name: "YDME 200NxT",
          image: lunaProImage,
        },
        {
          name: "YDME 100NxT",
          image: yaleImage,
        },
        {
          name: "YDME 50NxT",
          image: YMI70AYHImage,
        },
        {
          name: "YDME 50Pro",
          image: YMI70AYHImage,
        },
        {
          name: "REFLECTA Lock",
          image: YMI70AYHImage,
        },
      ],
    },
    {
      text: "Digital Home locker",
      count: 12,
      image: p4,
      bannerImage: image3,
      productList: [
        {
          name: "Fire Rated Biometric Firesafe (125TFL)",
          image: ds1,
        },
        {
          name: "Fire Rated Biometric Firesafe (530TFL)",
          image: ds2,
        },
      ],
    },
    {
      text: "Wardrobes",
      count: 8,
      image: p5,
      bannerImage: image6,
      productList: [
        {
          name: "FP-OP-F- B-02",
          image: fwl1,
        },
        {
          name: "FP-SL-F-B- 02",
          image: fwl2,
        },
        {
          name: "FP-OP-H- B-01",
          image: fwl3,
        },
        {
          name: "FP-SL-H- B-01",
          image: YMI70AYHImage,
        },
      ],
    },
    {
      text: "Digital Locks",
      count: 10,
      image: p1,
      bannerImage: image4,
      productList: [
        {
          name: "YDME 200NxT",
          image: lunaProImage,
        },
        {
          name: "YDME 100NxT",
          image: yaleImage,
        },
        {
          name: "YDME 50NxT",
          image: YMI70AYHImage,
        },
        {
          name: "YDME 50Pro",
          image: YMI70AYHImage,
        },
        {
          name: "REFLECTA Lock",
          image: YMI70AYHImage,
        },
      ],
    },
    {
      text: "Digital Home locker",
      count: 12,
      image: p4,
      bannerImage: image3,
      productList: [
        {
          name: "Fire Rated Biometric Firesafe (125TFL)",
          image: ds1,
        },
        {
          name: "Fire Rated Biometric Firesafe (530TFL)",
          image: ds2,
        },
      ],
    },
    {
      text: "Wardrobes",
      count: 8,
      image: p5,
      bannerImage: image6,
      productList: [
        {
          name: "Mesh Pin",
          image: MeshPinImage,
        },
        {
          name: "ML81PAH",
          image: ML81PAH,
        },
        {
          name: "ML81PAV",
          image: ML81PAV,
        },
      ],
    },
  ];
  const parallaxProducts1 = [
    {
      id: 1,
      image: left,
      text: "Lever Handles",
      items: "(150 items)",
      productList: [
        { name: "Luna Pro+ Facial", image: lunaProImage },
        { name: "Yale Kyra Pro", image: yaleImage },
        { name: "YMI70A-YH", image: YMI70AYHImage },
      ],
    },
  ];
  const parallaxProducts2 = [
    {
      id: 1,
      image: right,
      text: "Sofa",
      items: "(150 items)",
      productList: [
        { name: "Luna Pro+ Facial", image: lunaProImage },
        { name: "Yale Kyra Pro", image: yaleImage },
        { name: "YMI70A-YH", image: YMI70AYHImage },
      ],
    },
  ];
  const parallaxProducts3 = [
    {
      id: 1,
      image: left1,
      text: "Door Lock",
      items: "(150 items)",
      productList: [
        {
          name: "YDME 200NxT",
          image: lunaProImage,
        },
        {
          name: "YDME 100NxT",
          image: yaleImage,
        },
        {
          name: "YDME 50NxT",
          image: YMI70AYHImage,
        },
        {
          name: "YDME 50Pro",
          image: YMI70AYHImage,
        },
        {
          name: "REFLECTA Lock",
          image: YMI70AYHImage,
        },
      ],
    },
  ];
  const parallaxProducts4 = [
    {
      id: 1,
      image: right1,
      text: "Lever Handles",
      items: "(150 items)",
      productList: [
        { name: "Luna Pro+ Facial", image: lunaProImage },
        { name: "Yale Kyra Pro", image: yaleImage },
        { name: "YMI70A-YH", image: YMI70AYHImage },
      ],
    },
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <img
            src="/favIcon.png"
            alt="logo"
            className="spinner-border"
            style={{ width: "60px", height: "60px", border: "none" }}
          />
          <p className="mt-3 fw-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavbarTop />
      {/* <Navbar/> */}
      <div data-aos="fade-up" data-aos-delay="100">
        <NewHero />
      </div>
      {/* <HeroScrollSection/> */}
      {/* <LockSlider/> */}
     <div data-aos="fade-up" data-aos-delay="100" ><ProductCarousel products={categories} /></div>
      {/* <CollectionsCarosal/> */}
      <div data-aos="fade-up" data-aos-delay="100">
        <CubeCarousel />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <ShelfHighlight />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <SingleCarosal />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <TrendingProducts />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <EssentialsSection />
      </div>
      {/* <HeroScrollSection/> */}
      {/* <ScrollEffectSection/> */}
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
          leftData={parallaxProducts1[0]}
          rightData={parallaxProducts2[0]}
          leftData1={parallaxProducts3[0]}
          rightData1={parallaxProducts4[0]}
        />
      </div>
      <div data-aos="fade-right" data-aos-delay="100">
        <DealOfTheDay />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <ShopTheRoom />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <Brand />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <Testimonals />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <AboutUs />
      </div>
      {/* <AboutUsGrid/> */}
      <div data-aos="fade-up" data-aos-delay="100" data-aos-offset="500">
        <Sale />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <FAQ />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <OurServices />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <LocationMap />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <Footer/>
      </div>
    </>
  );
};
