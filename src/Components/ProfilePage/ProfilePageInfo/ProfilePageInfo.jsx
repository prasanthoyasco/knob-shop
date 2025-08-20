import React, { useEffect, useState } from "react";
import "./ProfilePageInfo.css";
import { getUserById, updateUser } from "../../../API/authApi";
import profileImage from "../../../Assets/Untitled/user-icon-trendy-flat-style-600nw-1697898655-removebg-preview.png";
import { getAddressByUserId,updateAddressById } from "../../../API/addressApi";
import { useNavigate } from "react-router-dom";
function ProfilePageInfo() {
  const navigate = useNavigate();
   const [user, setUser] = useState(null);
   const [addresses, setAddresses] = useState([]);
   const [editMode, setEditMode] = useState(false);
   const [addressEditId, setAddressEditId] = useState(null); 
   const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [addressForm, setAddressForm] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
 useEffect(() => {
  const storedUser = localStorage.getItem("authUser");
  if (!storedUser) return;

const parsedUser = JSON.parse(storedUser);
const id = parsedUser.id || parsedUser._id; 
  const loadUser = async () => {
    try {
      const data = await getUserById(id);
      console.log("user :",data)
      setUser(data.user);
      setFormData({
        name: data.user.name || "",
        phone: data.user.phone || "",
        email: data.user.email || "",
      });
              // Fetch addresses
              const addressData = await getAddressByUserId(id);
              setAddresses(addressData.addresses?.slice(0, 2) || []);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setErrorMessage("Failed to load profile. Please try again.");
    }
  };

  loadUser();
}, []); // ✅ Add empty dependency array to run only on mount

const handleEditClick = () => {
  setEditMode(true);
  setErrorMessage("");
  setSuccessMessage("");
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSave = async () => {
  try {
    const updated = await updateUser(user._id, formData);
    setUser(updated.user);
    setEditMode(false);
    setErrorMessage("");
    setSuccessMessage("Profile updated successfully!");
  } catch (err) {
    console.error("Update failed:", err);

    let message = "Something went wrong. Please try again.";

    // ✅ Case 1: Backend gave a direct error message
    if (err?.error && err.error !== "Server error") {
      message = err.error;
    }

    // ✅ Case 2: Duplicate key error from Mongo
    else if (err?.err?.code === 11000) {
      const field = Object.keys(err.err.keyPattern || {})[0];
      const value = err.err.keyValue?.[field];
      message = `The ${field} "${value}" is already in use. Please use a different one.`;
    }

    // ✅ Case 3: Generic server error
    else if (err?.error === "Server error") {
      message = "Server error. Please try again later.";
    }

    setSuccessMessage("");
    setErrorMessage(message);
  }
};


const handleCancel = () => {
  setFormData({ name: user.name, phone: user.phone, email: user.email });
  setEditMode(false);
  setErrorMessage("");
  setSuccessMessage("");
};

const handleAddressEdit = (addr) => {
  setAddressEditId(addr._id);
  setAddressForm({ ...addr }); // pre-fill form
};

const handleAddressChange = (e) => {
  const { name, value } = e.target;
  setAddressForm((prev) => ({ ...prev, [name]: value }));
};

const handleAddressSave = async () => {
  try {
    const updated = await updateAddressById(addressEditId, addressForm);
    console.log("Updated Address Response:", updated);

    setAddresses((prev) =>
      prev.map((a) =>
        a._id === addressEditId ? (updated.address || updated) : a
      )
    );

    setAddressEditId(null);
    setSuccessMessage("Address updated successfully!");
  } catch (err) {
    console.error("Address update failed:", err);
    setErrorMessage("Failed to update address. Try again.");
  }
};


const handleAddressCancel = () => {
  setAddressEditId(null);
};
useEffect(() => {
  console.log("address :", addresses);
}, [addresses]);


if (!user) return <p>Loading...</p>;
  return (
    <div className="profile-page-info-con">
      {/* ✅ Show messages */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <div className="user-info-con">
        <img src={profileImage}/>
        {!editMode && <i className="bi bi-pencil-square" onClick={handleEditClick}></i>}
        <div className="user-info-name-phone-email-con">
        {editMode ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="edit-mode-input-field"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="edit-mode-input-field"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="edit-mode-input-field"
              />
            </>
          ) : (
            <>
          <h2>{user?.name}</h2>
          <div className="user-phone-email-info">
              <div className="user-phone-icon-div">
                <i class="bi bi-telephone"></i>
                <p>{user?.phone || "9876543210"}</p>
              </div>
              <div className="user-phone-icon-div">
                <i class="bi bi-envelope"></i>
                <p>{user?.email}</p>
              </div>
          </div>
          </>
  )}
        </div>
      </div>
      {editMode && (
        <div className="profile-info-btns-div">
          <button onClick={handleSave} className="profile-info-btns-save">Save</button>
          <button onClick={handleCancel} className="profile-info-btns-cancel">Cancel</button>
        </div>
      )}
      <div className="saved-address-heading">
      <h2>Saved Addresses</h2>
      <p
          className="profile-page-view-all-text-p"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/account", { state: { section: "address" } })}
        >
          VIEW ALL
        </p>
      </div>
      <div className="user-address-con">
      {Array.isArray(addresses) && addresses.length > 0 ? (
  addresses.map((addr, index) =>
    addr ? (
      <div className="user-address-container-div" key={addr._id || index}>
        <div className="user-address-container-head">
          <h6>{index === 0 ? "Delivery Address" : "Billing Address"}</h6>
          <i
            className="bi bi-pencil-square"
            onClick={() => handleAddressEdit(addr)}
          ></i>
        </div>

        {addressEditId === addr._id ? (
  <div className="user-address-container-edit">
    <input
      type="text"
      name="street"
      value={addressForm.street || ""}
      onChange={handleAddressChange}
      placeholder="Street"
    />
    <input
      type="text"
      name="city"
      value={addressForm.city || ""}
      onChange={handleAddressChange}
      placeholder="City"
    />
    <input
      type="text"
      name="district"
      value={addressForm.district || ""}
      onChange={handleAddressChange}
      placeholder="District"
    />
    <input
      type="text"
      name="pincode"
      value={addressForm.pincode || ""}
      onChange={handleAddressChange}
      placeholder="Pincode"
    />
    <input
      type="text"
      name="state"
      value={addressForm.state || ""}
      onChange={handleAddressChange}
      placeholder="State"
    />
    <input
      type="text"
      name="phone"
      value={addressForm.phone || ""}
      onChange={handleAddressChange}
      placeholder="Phone"
    />

    <div className="address-edit-btns">
      <button onClick={handleAddressSave} className="address-save-btn">
        Save
      </button>
      <button onClick={handleAddressCancel} className="address-cancel-btn">
        Cancel
      </button>
    </div>
  </div>
) : (
  <div className="user-address-container-value">
    <h5>{user?.name || "Name"}</h5>
    <p>
      {addr.street}, {addr.city}, {addr.district} - {addr.pincode},{" "}
      {addr.state}
    </p>
  </div>
)}

      </div>
    ) : null
  )
) : (
  <p>No addresses found.</p>
)}

</div>



      {/* <div className="profile-page-info-input">
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>

      <div className="profile-page-info-input">
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>

      <div className="profile-page-info-input">
        <input
          type="text"
          placeholder="Mobile Number"
          name="mobile"
          value={formData.mobile}
          onChange={handleInputChange}
          disabled={!editMode}
        />
        <input
          type="date"
          name="dob"
          value={formData.dob ? formData.dob.slice(0, 10) : ""}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>

      <div className="profile-info-gender-div">
        <div
          className={`profile-info-gender-icon ${
            selectedGender === "female" ? "selected-gender" : ""
          }`}
          onClick={() => handleGenderClick("female")}
        >
          <i className="bi bi-gender-female"></i>
          <p>Female</p>
        </div>
        <div
          className={`profile-info-gender-icon ${
            selectedGender === "male" ? "selected-gender" : ""
          }`}
          onClick={() => handleGenderClick("male")}
        >
          <i className="bi bi-gender-male"></i>
          <p>Male</p>
        </div>
      </div>

      <div className="profile-info-btn-div">
        {!editMode ? (
          <button onClick={handleEdit} className="profile-info-btn-edit">
           {isediting? "Editing..." :  "Edit"}
          </button>
        ) : (
          <div className="profile-info-btns-div">
            <button onClick={handleSave} className="profile-info-btn-save">
              Save
            </button>
            <button onClick={handleCancel} className="profile-info-btn-cancel">
              Cancel
            </button>
          </div>
        )}
      </div> */}
    </div>
  );
}

export default ProfilePageInfo;
