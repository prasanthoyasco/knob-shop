import React from 'react'
import './Brand.css'
import brandImage from '../../Assets/brandImage.png'
function Brand() {
  return (
    <div className='brands-container'>
        <h5>TRUSTED BY TOP BRANDS</h5>
      <img src={brandImage}/>
      <button>SEE ALL BRANDS</button>
    </div>
  )
}

export default Brand
