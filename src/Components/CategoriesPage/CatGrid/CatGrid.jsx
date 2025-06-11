import React from 'react'
import './CatGrid.css'
import image1 from '../../../Assets/CategoriesImge/image.jpg'
import image2 from '../../../Assets/CategoriesImge/image-2.jpg'
import image3 from '../../../Assets/CategoriesImge/image-1.jpg'
import image4 from '../../../Assets/CategoriesImge/image-4.jpg'
import image5 from '../../../Assets/CategoriesImge/image-3.jpg'
import image6 from '../../../Assets/CategoriesImge/image-7.jpg'
import image7 from '../../../Assets/CategoriesImge/image-5.jpg'
import image8 from '../../../Assets/CategoriesImge/image-6.jpg'
const categoriesData = [
    { id: 1, image: image1, text: "Digital Safe Lockers", items: "(200 items)" },
    { id: 2, image: image2, text: "Beds & Mattresses", items: "(200 items)" },
    { id: 3, image: image3, text: "Cabinets & Storage", items: "(200 items)" },
    { id: 4, image: image4, text: "Dining Room", items: "(100 items)" },
    { id: 5, image: image5, text: "Living Rooms", items: "(150 items)" },
    { id: 6, image: image6, text: "Lighting Decor", items: "(200 items)" },
    { id: 7, image: image7, text: "Study & Home Office", items: "(150 items)" },
    { id: 8, image: image8, text: "Furniture", items: "(150 items)" },
  ];
  
  function CatGrid() {
    const rows = [];
    let buffer = [];
  
    categoriesData.forEach(item => {
      buffer.push(item);
  
      if ([1, 2, 3].includes(item.id) && buffer.length === 3) {
        rows.push({ layout: 'first-layout', items: [...buffer] });
        buffer = [];
      } else if ([4, 5].includes(item.id) && buffer.length === 2) {
        rows.push({ layout: 'second-layout', items: [...buffer] });
        buffer = [];
      } else if ([6,7,8].includes(item.id) && buffer.length === 3) {
        rows.push({ layout: 'third-layout', items: [...buffer] });
        buffer = [];
      }
    });
  
    // Handle remaining items
    if (buffer.length > 0) {
      rows.push({ layout: 'default-layout', items: buffer });
    }
  
    return (
        <div className='cat-data-grid-wrapper'>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className={`cat-data-grid-row ${row.layout}`}>
              {row.items.map((data, index) => (
                <div
                  key={index}
                  className={`cat-data-grid-div ${row.layout}-item-${index}`}
                >
                  <div className="cat-data-grid-image-wrapper">
                    <img src={data.image} className="cat-data-grid-image" />
                    <div className="cat-overlay" />
                  </div>
                  <div className='cat-data-grid-text'>
                    <h5>{data.text}</h5>
                    <p>{data.items}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
      
  }
  

export default CatGrid
