import React from 'react'
import './BookConsultForm.css'
function BookConsultForm() {
  return (
    <div className='book-form-container'>
      <div className='book-form-header'>
        <p>Step-by-step customer journey for the consultation form:</p>
      </div>

      <div className='book-form-con'>
        <div className='book-form-left'>
            <div className='input-and-text'>
                <p>Your Location</p>
<select defaultValue="">
  <option value="" disabled>Select an option</option>
  <option value="shopping">Tamil Nadu</option>
</select>

            </div>
            <div className='input-and-text'>
                <p>Pincode</p>
                <input type='text' placeholder='Enter Pincode'/>
            </div>
            <div className='input-and-text'>
                <p>Name</p>
                <input type='text' placeholder='Enter Full Name'/>
            </div>
            <div className='input-and-text'>
                <p>Mobile</p>
                <input type='text' placeholder='Enter Mobile Number'/>
            </div>
            <div className='book-form-right-checkbox'>
            <input type="checkbox" />
                <p>Contact me on WhatsApp</p>
            </div>
            <div className='input-and-text'>
                <p>Email Id</p>
                <input type='text' placeholder='Enter Mobile Number'/>
            </div>
            <div className='input-and-text'>
                <p>Tentative Budget</p>
                <input type='text' placeholder='Enter Mobile Number'/>
            </div>
        </div>

        <div className='book-form-right'>
            <div className='book-form-right-head'>
                <h5>Please tell us about your interests</h5>
            </div>
            <select className='book-form-right-select' defaultValue="">
  <option value="" disabled>Tell us what you are shopping for</option>
  <option value="shopping">Tell us what you are shopping for</option>
</select>

            <div className='book-consultation-button-div'>
            <button className='book-consultation-button'>BOOK CONSULTATION</button>
            </div>
            <div className='book-form-right-checkbox'>
            <input type="checkbox" />
                <p className='book-form-right-checkbox-p'>By submitting, you agree to our <strong>Privacy Policy.</strong></p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default BookConsultForm
