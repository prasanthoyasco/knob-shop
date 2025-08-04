import React, { useState } from 'react';
import './BookConsultForm.css';
import { createConsultation } from '../../../API/consultationApi'; // adjust path as needed

function BookConsultForm() {
  const [formData, setFormData] = useState({
    location: '',
    pincode: '',
    name: '',
    mobile: '',
    whatsapp: false,
    email: '',
    budget: '',
    interest: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await createConsultation(formData);
      alert('Consultation booked successfully!');
      console.log(response);
      setFormData({
        location: '',
        pincode: '',
        name: '',
        mobile: '',
        whatsapp: false,
        email: '',
        budget: '',
        interest: '',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to submit. Try again.');
    }
  };

  return (
    <div className='book-form-container'>
      <div className='book-form-header'>
        <p>Step-by-step customer journey for the consultation form:</p>
      </div>

      <div className='book-form-con'>
        <div className='book-form-left'>
          <div className='input-and-text'>
            <p>Your Location</p>
            <select name="location" value={formData.location} onChange={handleChange}>
              <option value="" disabled>Select an option</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
            </select>
          </div>

          <div className='input-and-text'>
            <p>Pincode</p>
            <input type='text' name="pincode" value={formData.pincode} onChange={handleChange} placeholder='Enter Pincode' />
          </div>

          <div className='input-and-text'>
            <p>Name</p>
            <input type='text' name="name" value={formData.name} onChange={handleChange} placeholder='Enter Full Name' />
          </div>

          <div className='input-and-text'>
            <p>Mobile</p>
            <input type='text' name="mobile" value={formData.mobile} onChange={handleChange} placeholder='Enter Mobile Number' />
          </div>

          <div className='book-form-right-checkbox'>
            <input type="checkbox" name="whatsapp" checked={formData.whatsapp} onChange={handleChange} />
            <p>Contact me on WhatsApp</p>
          </div>

          <div className='input-and-text'>
            <p>Email Id</p>
            <input type='text' name="email" value={formData.email} onChange={handleChange} placeholder='Enter Email' />
          </div>

          <div className='input-and-text'>
            <p>Tentative Budget</p>
            <input type='text' name="budget" value={formData.budget} onChange={handleChange} placeholder='Enter Budget' />
          </div>
        </div>

        <div className='book-form-right'>
          <div className='book-form-right-head'>
            <h5>Please tell us about your interests</h5>
          </div>

          <select className='book-form-right-select' name="interest" value={formData.interest} onChange={handleChange}>
            <option value="" disabled>Tell us what you are shopping for</option>
            <option value="Gold">Gold</option>
            <option value="Diamond">Diamond</option>
            <option value="Silver">Silver</option>
            <option value="Platinum">Platinum</option>
          </select>

          <div className='book-consultation-button-div'>
            <button className='book-consultation-button' onClick={handleSubmit}>
              BOOK CONSULTATION
            </button>
          </div>

          <div className='book-form-right-checkbox'>
            <input type="checkbox" />
            <p className='book-form-right-checkbox-p'>
              By submitting, you agree to our <strong>Privacy Policy.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookConsultForm;
