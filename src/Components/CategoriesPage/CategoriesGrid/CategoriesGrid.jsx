import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CategoriesGrid.css'
import image1 from '../../../Assets/CategoriesImge/image.jpg'
import image2 from '../../../Assets/CategoriesImge/image-2.jpg'
import image3 from '../../../Assets/CategoriesImge/image-1.jpg'
import image4 from '../../../Assets/CategoriesImge/image-4.jpg'
import image5 from '../../../Assets/CategoriesImge/image-3.jpg'
import image6 from '../../../Assets/CategoriesImge/image-7.jpg'
import image7 from '../../../Assets/CategoriesImge/image-5.jpg'
import image8 from '../../../Assets/CategoriesImge/image-6.jpg'

const categoriesData = [
  { id: 1, image: image1, text: "Smart Door Looks", items: "(200 items)" },
  { id: 2, image: image2, text: "Digital Door Lock", items: "(200 items)" },
  { id: 3, image: image3, text: "Premium Biometric Furniture Lock", items: "(200 items)" },
  { id: 4, image: image4, text: "Wardrobe Door Lock", items: "(100 items)" },
  { id: 5, image: image5, text: "Wardrobe Door Lock", items: "(150 items)" },
  { id: 6, image: image6, text: "Smart Lock Accessories", items: "(200 items)" },
  { id: 7, image: image7, text: "Smart Video Doorbell", items: "(150 items)" },
  { id: 8, image: image8, text: "Smart Surveillance Camera", items: "(150 items)"},
  { id: 1, image: image1, text: "Video Door Phone", items: "(200 items)" },
  { id: 2, image: image2, text: "Smart Safe", items: "(200 items)" },
  { id: 3, image: image3, text: "Digital Safes", items: "(200 items)" },
  { id: 4, image: image4, text: "Door Control Devices", items: "(100 items)" },
  { id: 5, image: image5, text: "Lever Handles", items: "(150 items)" },
  { id: 6, image: image6, text: " Mortise Eternal Lever Handle Comboset", items: "(200 items)" },
  { id: 7, image: image7, text: "Essential Series", items: "(150 items)" },
  { id: 8, image: image8, text: "Mortise Locksets", items: "(150 items)"},
  { id: 1, image: image1, text: "Euro Profile Cylinders", items: "(200 items)" },
  { id: 2, image: image2, text: "Mortise Locks", items: "(200 items)" },
  { id: 3, image: image3, text: " Rim Locks", items: "(200 items)" },
  { id: 4, image: image4, text: "Electric Rim Lock", items: "(100 items)" },
  { id: 5, image: image5, text: "Cylindrical Locksets", items: "(150 items)" },
  { id: 6, image: image6, text: "Lever Locksets", items: "(200 items)" },
  { id: 7, image: image7, text: "Furniture Hardware", items: "(150 items)" },
  { id: 8, image: image8, text: " Padlocks", items: "(150 items)"},
]

function CategoriesGrid() {
  const navigate = useNavigate()

  const handleClick = (id) => {
    console.log("Clicked:", id);
    navigate(`/category/${id}`)
  }

  return (
    <div className='categories-data-grid-container'>
      {categoriesData.map((data, index) => (
        <div key={index} onClick={() => handleClick(data.id)} className='categories-data-grid-div'>
          <img src={data.image} className='categories-data-grid-image' />
          <div className='categories-data-grid-text'>
            <h5>{data.text}</h5>
            <p>{data.items}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CategoriesGrid
