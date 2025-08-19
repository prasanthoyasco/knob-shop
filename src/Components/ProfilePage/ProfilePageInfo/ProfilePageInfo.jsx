import React, { useEffect, useState } from "react";
import "./ProfilePageInfo.css";
import { getUserById, updateUser } from "../../../API/authApi";
import profileImage from "../../../Assets/Untitled/user-icon-trendy-flat-style-600nw-1697898655-removebg-preview.png";
function ProfilePageInfo() {
   const [user, setUser] = useState(null);
   const [isediting,SetIsediting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    dob: "",
  });

 useEffect(() => {
  const storedUser = localStorage.getItem("authUser");
  if (!storedUser) return;

const parsedUser = JSON.parse(storedUser);
const id = parsedUser.id || parsedUser._id; 
  const loadUser = async () => {
    try {
      const data = await getUserById(id);
      setUser(data.user);

      setFormData({
        firstName: data.user.name?.split(" ")[0] || "",
        lastName: data.user.name?.split(" ")[1] || "",
        email: data.user.email || "",
        mobile: data.user.phone || "",
        dob: data.user.dateofbirth || "",
      });

      setSelectedGender(data.user.gender || "");
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  loadUser();
}, []); // ✅ Add empty dependency array to run only on mount

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
  const handleSave = async () => {
    SetIsediting(true)
  try {
    const storedUser = JSON.parse(localStorage.getItem("authUser"));
    const id = storedUser.id || storedUser._id;  
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    const updated = await updateUser(id, {
      name: fullName,
      email: formData.email,
      phone: formData.mobile,
      gender: selectedGender,
      dateofbirth: formData.dob,
    });

    setUser(updated.user);
    setEditMode(false);
    localStorage.setItem("authUser", JSON.stringify(updated.user));
  } catch (err) {
    console.error("Failed to update user:", err);
  }finally{
    SetIsediting(true)
  }
}

  return (
    <div className="profile-page-info-con">

      <div className="user-info-con">
        <img src={profileImage}/>
        <i class="bi bi-pencil-square"></i>
        <div className="user-info-name-phone-email-con">
          <h2>Amanda Tate</h2>
          <div className="user-phone-email-info">
              <div className="user-phone-icon-div">
                <i class="bi bi-telephone"></i>
                <p>70924 66600</p>
              </div>
              <div className="user-phone-icon-div">
                <i class="bi bi-envelope"></i>
                <p>ecom@knobsshop.store</p>
              </div>
          </div>
        </div>
      </div>
      <div className="saved-address-heading">
      <h2>Saved Addresses</h2>
      <a href="/" className="profile-page-view-all-text">
        <p className="profile-page-view-all-text-p">VIEW ALL</p>
      </a>
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
