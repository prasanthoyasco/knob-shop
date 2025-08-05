import "./ProfilePageSidebar.css";
import profileImage from "../../../Assets/CategoriesImge/Knob Shop/personImage.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "react-bootstrap";
import { useWishlist } from "../../../Context/WishlistContext";
import { useCart } from "../../../Context/CartContext";

function ProfilePageSidebar({ setActiveSection, activeSection }) {
  const { clearWishlist } = useWishlist();
  const { clearCart } = useCart();
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
  }, [setProfileData]);

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("authUser"); // or clear all: localStorage.clear();
    localStorage.removeItem("authToken");
    clearWishlist(); // clear wishlist
    clearCart(); // Clear cart items
    alert("Signed out successfully"); // Optional
    navigate("/"); // Redirect to login page or home
  };

const getBackgroundColor = (name) => {
  const colors = ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF",
  "#E0BBE4", "#D5AAFF", "#B5EAD7", "#C7CEEA", "#FFDAC1",
  "#FF9AA2", "#F3FFE3", "#E2F0CB", "#C8D5B9", "#A2D2FF"];
  const index = name?.charCodeAt(0) % colors.length;
  return colors[index];
};



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedProfile = {
        ...profiledata,
        profileUrl: reader.result, // base64 image
      };

      localStorage.setItem("authUser", JSON.stringify(updatedProfile));
      setProfileData(updatedProfile);
    };
    reader.readAsDataURL(file); // convert to base64
  };

  return (
    <div className="profile-page-sidebar-con">
      <div className="profile-page-sidebar-image">
  <label htmlFor="profile-upload" style={{ cursor: "pointer" }}>
    {profiledata?.profileUrl ? (
      <img
        src={profiledata.profileUrl || profileImage}
        alt="Profile"
        style={{ width: 100, height: 100, borderRadius: "10px" }}
      />
    ) : (
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: "10px",
          backgroundColor: getBackgroundColor(profiledata?.name),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "40px",
          fontWeight: "bold",
          color: "#888",
        }}
      >
        {profiledata?.name?.[0]?.toUpperCase() || "U"}
      </div>
    )}
  </label>

  <input
    type="file"
    id="profile-upload"
    accept="image/*"
    style={{ display: "none" }}
    onChange={handleImageChange}
  />

  <h4>{profiledata?.name}</h4>
  <p>{profiledata?.email || profiledata?.phone}</p>
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

        <div
          className="profile-page-sidebar-info"
          onClick={handleSignOut}
          style={{ cursor: "pointer" }}
        >
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
