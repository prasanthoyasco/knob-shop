import React, { useState } from 'react';
import './ProfilePageInfo.css';

function ProfilePageInfo({ setActiveSection }) {
  const [editMode, setEditMode] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dob: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderClick = (gender) => {
    if (editMode) {
      setSelectedGender(gender);
    }
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);
  const handleSave = () => {
    // TODO: Save to backend
    setEditMode(false);
  };

  return (
    <div className='profile-page-info-con'>
      <div className='profile-page-info-head'>
        <h1>Personal Information</h1>
      </div>

      <div className='profile-page-info-input'>
        <input
          type='text'
          placeholder='First Name'
          name='firstName'
          value={formData.firstName}
          onChange={handleInputChange}
          disabled={!editMode}
        />
        <input
          type='text'
          placeholder='Last Name'
          name='lastName'
          value={formData.lastName}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>

      <div className='profile-page-info-input'>
        <input
          type='text'
          placeholder='Email'
          name='email'
          value={formData.email}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>

      <div className='profile-page-info-input'>
        <input
          type='text'
          placeholder='Mobile Number'
          name='mobile'
          value={formData.mobile}
          onChange={handleInputChange}
          disabled={!editMode}
        />
        <input
          type='date'
          name='dob'
          value={formData.dob}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>

      <div className='profile-info-gender-div'>
        <div
          className={`profile-info-gender-icon ${
            selectedGender === 'female' ? 'selected-gender' : ''
          }`}
          onClick={() => handleGenderClick('female')}
        >
          <i className="bi bi-gender-female"></i>
          <p>Female</p>
        </div>
        <div
          className={`profile-info-gender-icon ${
            selectedGender === 'male' ? 'selected-gender' : ''
          }`}
          onClick={() => handleGenderClick('male')}
        >
          <i className="bi bi-gender-male"></i>
          <p>Male</p>
        </div>
      </div>

      <div className='profile-info-btn-div'>
        {!editMode ? (
          <button onClick={handleEdit} className='profile-info-btn-edit'>Edit</button>
        ) : (
          <div className='profile-info-btns-div'>
            <button onClick={handleSave} className='profile-info-btn-save'>Save</button>
            <button onClick={handleCancel} className='profile-info-btn-cancel'>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePageInfo;
