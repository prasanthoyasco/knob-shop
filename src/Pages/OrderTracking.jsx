import React, { useEffect, useState } from 'react'
import NavbarTop from '../Components/Navbar/NavbarTop/NavbarTop'
import { Tracking } from '../Components/Tracking/Tracking'
import defaultImage from "/images/feature-alarm.png";
import CartItemsList from '../Components/CartPage/CartItemsList'

import { useLocation } from 'react-router-dom'
import Footer from '../Components/Footer/Footer';

export const OrderTracking = () => {
    const location = useLocation();

    // const passedItems = location.state?.cartItems;
    
      const [cartItems, setCartItems] = useState(
        // passedItems?.length
        //   ? passedItems
        //   : 
          [
            {
              "installation": {
                "videoUrl": "",
                "content": ""
              },
              "discount": {
                "type": null,
                "value": 0,
                "startDate": null,
                "endDate": null,
                "isActive": false
              },
              "dimensions": {
                "weight": 0,
                "height": 0,
                "width": 0,
                "length": 0
              },
              "_id": "688b1195fcadae6eb154400e",
              "name": "Metalla 510 Soft Close Hinge Full Overlay 105° Steel Nickel Plated 48/6 Mm",
              "productId": "311.46.591",
              "description": "The Hafele 48/6 mm Metalla 510 Steel Nickel Plated 105° Full Overlay Soft Close Hinge Kit (Product Code: 311.46.591) is a comprehensive and sophisticated solution for your cabinet hardware needs, providing a perfect balance of durability, modern design, and advanced functionality. This kit includes all the components required for one pair of hinges, offering a convenient and efficient choice for enhancing your cabinetry.\n\nCrafted with precision from high-quality steel, these hinges are nickel-plated to ensure corrosion resistance and a polished aesthetic. The 105° full overlay design provides versatility for various cabinet door configurations, ensuring a smooth and reliable operation. The soft-close feature adds a touch of elegance by providing a controlled and gentle closing motion, preventing slamming and extending the life of both the hinges and the cabinet structure.\n\nThe Metalla 510 Steel construction ensures durability, making these hinges suitable for long-term use in various applications. The nickel-plated finish not only enhances the hinges' resistance to corrosion but also adds a sleek and modern touch to your cabinetry.\n\nInstallation is made easy with the included kit components, accommodating both DIY enthusiasts and professional carpenters. The Hafele Metalla 510 Steel Nickel Plated 105° Full Overlay Soft Close Hinge Kit excels in functionality and contributes to the overall visual and tactile experience of your cabinets.\n\nUpgrade your cabinet hardware with this high-quality, soft-close hinge kit, showcasing Hafele's dedication to excellence in both design and functionality. Trust in Hafele for a seamless fusion of innovation and quality craftsmanship in your cabinetry solutions, ensuring durability, style, and a touch of modernity in equal measure.",
              "brand": "Hafele",
              "category": {
                "_id": "6888b08542e07ad91f60e7ae",
                "category_name": "Auto Hinges",
                "description": "Stylish door Hinges",
                "categoryImageUrl": "https://res.cloudinary.com/dpea4iv0b/image/upload/v1754562888/rfswkdlgwg8gaix7a3ga.jpg",
                "createdAt": "2025-07-29T11:29:09.707Z",
                "updatedAt": "2025-08-07T10:34:52.435Z",
                "__v": 0
              },
              "status": "active",
              "stock": null,
              "images": [
                "https://res.cloudinary.com/dpea4iv0b/image/upload/v1753944083/h1pwwdzg3s6nsgk3netl.jpg",
                "https://res.cloudinary.com/dpea4iv0b/image/upload/v1753944084/is8xawc2ewmgjdfeipkp.jpg"
              ],
              "video": "",
              "brochure": "https://res.cloudinary.com/dpea4iv0b/image/upload/v1753944124/imtz8hq19mu8gdjjdbcm.pdf",
              "features": [],
              "variant": [
                {
                  "title": "Nickel Plated",
                  "value": "#dadbd8",
                  "price": 0,
                  "images": [
                    {
                      "url": "https://res.cloudinary.com/dpea4iv0b/image/upload/v1753944083/h1pwwdzg3s6nsgk3netl.jpg",
                      "deleteToken": "afbdaaec52a8af9c4f8a91627fe3a085d6672463defcfaa1f9963c8818bf96cdfbc85f960e3f8c00d478783d8b7af84b9ffc73a57eff2241651cac7e47ace67b6b1cae217a301ea04dcdf10a6918914c96e72662fc3b0d0bfdab0e675259b8a33aabdda1f8d093233aec913658526885a4e927950335bbd9fb476c3a24ce1c45",
                      "_id": "688b1195fcadae6eb1544010"
                    },
                    {
                      "url": "https://res.cloudinary.com/dpea4iv0b/image/upload/v1753944084/is8xawc2ewmgjdfeipkp.jpg",
                      "deleteToken": "dfb56c7a76cbdac6aaaa8c68274988ec9cfebf4a492a23284c06f09e56fa3d784f2ec6e5ca29acd190c6a7fbb1b32ae51d91c5e44be3d5fbdaa2b3ddaf4b5206758e17a26068dfad95e3dd0205be6fa10f734fa79a30016a0eb1687db7c1d123443fe8d98dd8bb005b33f33c73d981c0899bc22050af99a48574e02c69a051a4",
                      "_id": "688b1195fcadae6eb1544011"
                    }
                  ],
                  "sizes": [
                    {
                      "label": "",
                      "mrp": 325,
                      "discountPercentage": 40,
                      "taxPercentage": 18,
                      "sellingPrice": 230.1,
                      "stock": 100,
                      "_id": "688b1195fcadae6eb1544012"
                    }
                  ],
                  "_id": "688b1195fcadae6eb154400f"
                }
              ],
              "key_features": [],
              "tech_spec": [
                {
                  "title": "Finish Type",
                  "value": "Nickel Plated",
                  "_id": "688b1195fcadae6eb1544013"
                },
                {
                  "title": "Model No ",
                  "value": "311.46.591",
                  "_id": "688b1195fcadae6eb1544014"
                },
                {
                  "title": "Material",
                  "value": "Steel",
                  "_id": "688b1195fcadae6eb1544015"
                },
                {
                  "title": "Mounting Type",
                  "value": "Full Overlay",
                  "_id": "688b1195fcadae6eb1544016"
                },
                {
                  "title": "Type of Product",
                  "value": "Soft Close Hinge",
                  "_id": "688b1195fcadae6eb1544017"
                },
                {
                  "title": "Series",
                  "value": "Metalla 510",
                  "_id": "688b1195fcadae6eb1544018"
                },
                {
                  "title": "Closing Type",
                  "value": "Soft Close",
                  "_id": "688b1195fcadae6eb1544019"
                },
                {
                  "title": "Opening Angle",
                  "value": "105°",
                  "_id": "688b1195fcadae6eb154401a"
                },
                {
                  "title": "Drill Size",
                  "value": "48/6 mm",
                  "_id": "688b1195fcadae6eb154401b"
                }
              ],
              "createdBy": null,
              "createdAt": "2025-07-31T06:47:49.594Z",
              "updatedAt": "2025-07-31T06:47:49.594Z",
              "__v": 0
            }
            ]
      );

 const handleIncrement = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

//   const handleDelete = (id) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   };
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
    <><NavbarTop/>
    <div className='container-flued mx-5'>
    <Tracking/>
     <CartItemsList
      cartItems={cartItems}
      handleIncrement={handleIncrement}
      handleDecrement={handleDecrement}
    //   handleDelete={handleDelete}
      isTrackingPage={true}
    />
    </div>
    <Footer/>
    </>
  )
}

