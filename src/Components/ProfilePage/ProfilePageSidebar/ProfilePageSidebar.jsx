import "./ProfilePageSidebar.css";
import profileImage from "../../../Assets/CategoriesImge/Knob Shop/personImage.jpg";
import { useEffect, useState } from "react";

function ProfilePageSidebar({ setActiveSection, activeSection }) {
  const isActive = (section) =>
    section === activeSection
      ? "profile-page-sidebar-icon-text active"
      : "profile-page-sidebar-icon-text";
  const [profiledata, setProfileData] = useState({
    name: "John Doe",
    email: "",
  });
  useEffect(() => {
    localStorage.getItem("authUser") &&
    console.log(localStorage.getItem("authUser"));    
      setProfileData(JSON.parse(localStorage.getItem("authUser")));
  },[setProfileData]);

  return (
    <div className="profile-page-sidebar-con">
      <div className="profile-page-sidebar-image">
        <img src={profileImage} alt="Profile" />
        <h4>{profiledata?.name}</h4>
        <p>{profiledata?.email}</p>
      </div>

      <div>
        <div className="profile-page-sidebar-info">
          <div
            className={isActive("personal")}
            onClick={() => setActiveSection("personal")}
          >
            <i className="bi bi-info-circle"></i>
            <h5>Personal Information</h5>
          </div>
          <div
            className={isActive("address")}
            onClick={() => setActiveSection("address")}
          >
            <i className="bi bi-geo-alt"></i>
            <h5>Addresses</h5>
          </div>
        </div>

        <div className="profile-page-sidebar-info">
          <div
            className={isActive("cart")}
            onClick={() => setActiveSection("cart")}
          >
            <i className="bi bi-cart"></i>
            <h5>My cart</h5>
          </div>
          <div
            className={isActive("wishlist")}
            onClick={() => setActiveSection("wishlist")}
          >
            <i className="bi bi-heart"></i>
            <h5>My wishlist</h5>
          </div>
          <div
            className={isActive("orders")}
            onClick={() => setActiveSection("orders")}
          >
            <i className="bi bi-box-seam"></i>
            <h5>My orders</h5>
          </div>
        </div>

        <div className="profile-page-sidebar-info">
          <div
            className={isActive("help")}
            onClick={() => setActiveSection("help")}
          >
            <i className="bi bi-patch-question"></i>
            <h5>Need Help</h5>
          </div>
        </div>

        <div className="profile-page-sidebar-info">
          <div className="profile-page-sidebar-icon-text">
            <i className="bi bi-box-arrow-in-left"></i>
            <h5>Sign Out</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePageSidebar;
