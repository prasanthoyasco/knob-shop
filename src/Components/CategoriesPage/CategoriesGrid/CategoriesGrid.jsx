import React from 'react'
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
    {image : image1 , text : "Digital Safe Lockers",items : "(200 items)"},
    {image : image2 , text : "Beds & Mattresses",items : "(200 items)"},
    {image : image3 , text : "Cabinets & Storage",items : "(200 items)"},
    {image : image4 , text : "Dining Room",items : "(100 items)"},
    {image : image5 , text : "Living Rooms",items : "(150 items)"},
    {image : image6 , text : "Lighting Decor",items : "(200 items)"},
    {image : image7 , text : "Study & Home Office",items : "(150 items)"},
    {image : image8 , text : "Furniture",items : "(150 items)"},
]
function CategoriesGrid() {
  return (
    <div className='categories-data-grid-container'>
      {categoriesData.map((data,index)=>(
        <div className='categories-data-grid-div'>
            <img src={data.image} className='categories-data-grid-image'/>
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
