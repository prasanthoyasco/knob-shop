import React from 'react'
import './OurServices.css'
import fastDeleveryImage from '../../Assets/fast-delevery.png'
import amazingValueImage from '../../Assets/amazing-value-image.png'
import helpCustomerImage from '../../Assets/help-customer-image.png'
import designerImage from '../../Assets/designer-image.png'
const serviceContent = [
    {image : fastDeleveryImage,heading : "Fast,Secure Delevery",para :"Two-day delevery on thousands of items"},
    {image : amazingValueImage ,heading: "Amazing value for Every Day",para :"Items you love at price that fit your budget"},
    {image : helpCustomerImage,heading : "Helpfull Customer Support",para :"Our friendly team's on hand 24/7 a day"},
    {image : designerImage,heading : "100+In-House Designer",para :"All things home & garden in one place"},
]
function OurServices() {
  return (
    <div className='our-service-container'>
      {serviceContent.map((content,index)=>(
        <div className='service-image-heading-para-content'>
            <img src={content.image}/>
            <h6>{content.heading}</h6>
            <p>{content.para}</p>
        </div>
      ))}
    </div>
  )
}

export default OurServices
