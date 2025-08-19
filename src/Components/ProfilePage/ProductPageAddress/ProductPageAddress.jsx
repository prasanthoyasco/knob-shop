import React,{useState} from 'react'
import './ProductPageAddress.css'
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
      <div className="saved-address-heading">
      <h2>Saved Addresses</h2>
      <button className='new-address-add-btn'>
        + ADD NEW ADDRESS
      </button>
      </div>
    <div className="user-address-con">

      <div className="user-address-container-div">
        <div className="user-address-container-head">
          <h6>Delivery Address</h6>
          <i class="bi bi-pencil-square"></i>
        </div>
        <div className="user-address-container-value">
          <h5>Amanda Tate</h5>
          <p>2400 Route 9, Fishkill NY 12524</p>
        </div>
      </div>

      <div className="user-address-container-div">
        <div className="user-address-container-head">
          <h6>Billing Address</h6>
          <i class="bi bi-pencil-square"></i>
        </div>
        <div className="user-address-container-value">
          <h5>Amanda Tate</h5>
          <p>2400 Route 9, Fishkill NY 12524</p>
        </div>
      </div>
    </div>
    <p>You have no other address entries in your address book.</p>
      {/* <div className='profile-page-info-input'>
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
      </div> */}
    </div>
  )
}

export default ProductPageAddress
