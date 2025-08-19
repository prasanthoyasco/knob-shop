import React,{useState,useEffect} from 'react'
import './ProductPageAddress.css'
import { getAddressByUserId } from "../../../API/addressApi";
function ProductPageAddress() {
  const [addresses, setAddresses] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
      doorNo: '',
      street: '',
      city: '',
      district: '',
      state: '',
      pincode: '',
    });
    useEffect(() => {
      const storedUser = localStorage.getItem("authUser");
      if (!storedUser) return;
  
      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser.id || parsedUser._id;
  
      const loadAddresses = async () => {
        try {
          const addressData = await getAddressByUserId(userId);
          setAddresses(addressData.addresses || []);
        } catch (err) {
          console.error("Failed to fetch addresses:", err);
        }
      };
  
      loadAddresses();
    }, []);
  
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
    {addresses.length > 0 ? (
          addresses.map((addr) => (
      <div className="user-address-container-div">
        <div className="user-address-container-head">
          <h6>{addr.type || "Address"}</h6>
          <i class="bi bi-pencil-square"></i>
        </div>
        <div className="user-address-container-value">
          <h5>{addr.name || "Name"}</h5>
          <p>{addr.doorNo || ""}, {addr.street}, {addr.city}, {addr.district}{" "} {addr.pincode}, {addr.state}</p>
        </div>
      </div>
          ))
          ) : (
            <p>You have no other address entries in your address book.</p>
          )}
    </div>

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
