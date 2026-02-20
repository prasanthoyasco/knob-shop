import React, { useState } from 'react';
import './BookConsultForm.css';
import { createConsultation } from '../../../API/consultationApi'; // adjust path as needed
import { useNavigate } from 'react-router-dom';
function BookConsultForm() {
  const navigate = useNavigate()
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(''); // 'success' | 'error'
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

  const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

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

      // ✅ Send to Google Sheet via GET (no CORS/401 issues from browser)
      if (GOOGLE_SHEET_URL) {
        const params = new URLSearchParams({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          whatsapp: formData.whatsapp ? 'Yes' : 'No',
          location: formData.location,
          category: formData.category,
          budget: formData.budget,
          interest: formData.interest,
        });

        fetch(`${GOOGLE_SHEET_URL}?${params.toString()}`, {
          method: 'GET',
          mode: 'no-cors',
        })
          .then(() => console.log('✅ Google Sheet entry saved'))
          .catch((err) => console.error('❌ Google Sheet error:', err.message));
      }

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
      setSubmissionStatus('success');
      setSubmissionMessage('Your booking has been submitted successfully! We will call you soon.');

      // navigate('/')
    } catch (err) {
      console.error(err);
      setSubmissionStatus('error');
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
    "Limo Coat", "Living Room ", "Bedroom ", "Kitchen ", "Study Room ", "Glass Partition ", "Balcony ", "Hotels & Hospitals ", "Others",
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
            <div
              className='submission-message'
              style={{
                marginTop: '10px',
                padding: '10px 14px',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '14px',
                backgroundColor: submissionStatus === 'success' ? '#e6f9f0' : '#fff0f0',
                color: submissionStatus === 'success' ? '#1a8a4a' : '#d9363e',
                border: `1px solid ${submissionStatus === 'success' ? '#a3d9b8' : '#f5b8b8'}`,
              }}
            >
              {submissionMessage}
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
