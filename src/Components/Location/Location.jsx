import React from 'react'
import './Location.css'
import locationImage from '../../Assets/googleMap.png'
function Location() {
  return (
    <div className='location-container'>
      <img src={locationImage} className='location-image'/>
    </div>
  )
}

export default Location
