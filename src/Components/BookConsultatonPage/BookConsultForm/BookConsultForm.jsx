import React, { useState } from 'react';
import './BookConsultForm.css';
import { createConsultation } from '../../../API/consultationApi'; // adjust path as needed
import { useNavigate } from 'react-router-dom';
function BookConsultForm() {
  const navigate = useNavigate()
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    location: '',
    category: '',
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
    if (
      !formData.name.trim() ||
      !formData.mobile.trim() ||
      !formData.email.trim() ||
      !formData.category ||
      !formData.location ||
      !formData.budget.trim() ||
      !formData.interest.trim()
    ) {
      setErrorMessage('Please fill all required fields before submitting.');
      return;
    }
    try {
      const response = await createConsultation(formData);
      console.log(response);
      setFormData({
        location: '',
        category: '',
        name: '',
        mobile: '',
        whatsapp: false,
        email: '',
        budget: '',
        interest: '',
      });
      setSubmissionMessage('Your booking has been submitted successfully! We will call you soon.');

      navigate('/')
    } catch (err) {
      console.error(err);
      setSubmissionMessage('Failed to submit. Please try again.');


    }
  };
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
    "Ladakh", "Lakshadweep", "Puducherry"
  ];
  const categoryList = [
    "Living Room", "Bedroom", "Kitchen", "Limo Coat", "Dinning Room", "Sofa", "Lightning", "Coffee Tables", "Storage Cabinets",
  ];

  return (
    <div className='book-form-container'>
      <div className='book-form-header'>
        <p>Step-by-step customer journey for the consultation form:</p>
      </div>

      <div className='book-form-con'>
        <div className='book-form-left'>


          <div className='input-and-text'>
            <p>Name</p>
            <input type='text' name="name" value={formData.name} onChange={handleChange} placeholder='Enter Full Name' required />
          </div>


          <div className='input-and-text'>
            <p>Mobile</p>
            <input type='text' name="mobile" value={formData.mobile} onChange={handleChange} placeholder='Enter Mobile Number' required />
          </div>

          <div className='book-form-right-checkbox'>
            <input type="checkbox" name="whatsapp" checked={formData.whatsapp} onChange={handleChange} />
            <p>Contact me on WhatsApp</p>
          </div>

          <div className='input-and-text'>
            <p>Email Id</p>
            <input type='text' name="email" value={formData.email} onChange={handleChange} placeholder='Enter Email' required />
          </div>


          <div className='input-and-text'>
            <p>Category</p>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="" disabled>Select your category</option>
              {categoryList.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>

          </div>

          <div className='input-and-text'>
            <p>Your Location</p>
            <select name="location" value={formData.location} onChange={handleChange} required>
              <option value="" disabled>Select your state</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>

          </div>

          <div className='input-and-text'>
            <p>Tentative Budget</p>
            <input type='text' name="budget" value={formData.budget} onChange={handleChange} placeholder='Enter Budget' required />
          </div>
        </div>

        <div className='book-form-right'>
          <div className='book-form-right-head'>
            <h5>Please tell us about your interests</h5>
          </div>

          <textarea
            className='book-form-right-select'
            name="interest"
            placeholder="Tell us what you are shopping for"
            value={formData.interest}
            onChange={handleChange}
            required
          />
          {errorMessage && (
            <div className='error-message' style={{ color: 'red', marginTop: '5px' }}>
              {errorMessage}
            </div>
          )}

          {submissionMessage && (
            <div className='submission-message'>
              <p>{submissionMessage}</p>
            </div>
          )}


          <div className='book-consultation-button-div'>
            <button className='book-consultation-button' onClick={handleSubmit}>
              BOOK CONSULTATION
            </button>
          </div>

          <div className='book-form-right-checkbox'>
            <input type="checkbox" />
            <p className='book-form-right-checkbox-p'>
              By submitting, you agree to our <strong onClick={() => navigate('/privacy-policy')}>Privacy Policy.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookConsultForm;
