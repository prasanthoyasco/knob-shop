import React,{useState} from 'react'

function ProductPageAddress() {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
      doorNo: '',
      street: '',
      city: '',
      district: '',
      state: '',
      pincode: '',
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
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
        <h1>Address</h1>
      </div>

      <div className='profile-page-info-input'>
        <input
          type='text'
          placeholder='Door No'
          name='doorNo'
          value={formData.firstName}
          onChange={handleInputChange}
          disabled={!editMode}
        />
        <input
          type='text'
          placeholder='Street'
          name='street'
          value={formData.lastName}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>

      <div className='profile-page-info-input'>
        <input
          type='text'
          placeholder='city'
          name='city'
          value={formData.email}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>

      <div className='profile-page-info-input'>
        <input
          type='text'
          placeholder='District'
          name='district'
          value={formData.mobile}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>
      <div className='profile-page-info-input'>
        <input
          type='text'
          placeholder='State'
          name='state'
          value={formData.mobile}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>
      <div className='profile-page-info-input'>
        <input
          type='text'
          placeholder='Pincode'
          name='pincode'
          value={formData.mobile}
          onChange={handleInputChange}
          disabled={!editMode}
        />
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
  )
}

export default ProductPageAddress
