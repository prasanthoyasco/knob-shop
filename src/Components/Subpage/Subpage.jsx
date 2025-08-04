import { useNavigate, useParams } from "react-router-dom";
import NavbarTop from "../Navbar/NavbarTop/NavbarTop";
import SingleCarosal from "../singleCarosal/SingleCarosal";
import singleCarosal1 from "../../Assets/blogcoverphoto.jpg";
import singleCarosal2 from "../../Assets/Untitled/w2.jpg";
import singleCarosal3 from "../../Assets/Untitled/w3.jpg";
import CategoryPageLayout2 from "../CategoryPageLayout2/CategoryPageLayout2";
import Footer from "../Footer/Footer";

const sampleProduct = [{
  id: "pankaj-plywood-001",
  title: "Pankaj Premium Waterproof Plywood",
  rating: 4.7,
  variant: [
    {
      title: "Natural Wood",
      value: "#D4A373",
      sizes: [
        {
          label: "8x4 ft",
          mrp: 2500,
          sellingPrice: 1999,
        },
        {
          label: "7x4 ft",
          mrp: 2300,
          sellingPrice: 1899,
        },
      ],
      images: [
        {
          url: "https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg", // angled shot
        }
      ],
    },
    {
      title: "Walnut Finish",
      value: "#6F4E37",
      sizes: [
        {
          label: "8x4 ft",
          mrp: 2600,
          sellingPrice: 2099,
        },
        {
          label: "7x4 ft",
          mrp: 2400,
          sellingPrice: 1999,
        },
      ],
      images: [
        {
          url: "https://images.pexels.com/photos/276514/pexels-photo-276514.jpeg",
        },
        {
          url: "https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg",
        },
      ],
    },
  ],
}];


export function Subpage() {
   const { brandName } = useParams();
    const navigate = useNavigate();
    let image;
if (brandName === "PankajPlywood") {
  image = singleCarosal1;
} else if (brandName === "Decorpoint") {
  image = singleCarosal2;
} else if (brandName === "Faber") {
  image = singleCarosal3;
} else {
  image = "/fallback.png";
}

  return (
    <>
    <NavbarTop/>
    <div className='categories-page-container'>
          <img src={image || '/fallback.png'} className='background-image'/>
          <div className='categories-image-overlay'></div>
          <div className='categories-image-overlay-text'>
            <p><span style={{cursor:"pointer"}} onClick={()=>navigate('/')}>HOME / {brandName} </span></p>
            <h1>{brandName}</h1>
          </div>
        </div>
    <SingleCarosal/>
    <CategoryPageLayout2 products={sampleProduct}/>
    <Footer />
    </>
  )
}

