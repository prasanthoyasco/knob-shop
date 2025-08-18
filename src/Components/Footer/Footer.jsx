// import React from "react";
import "./Footer.css";
import footerImage from "../../Assets/footer-logo.png";
// import FbInstaYoutubeImage from "../../Assets/fb-insta-youTube.png";
// import insta_icon from "../../Assets/insta-icon.svg";
// import { Link } from "react-router-dom"; // add this
import { useNavigate } from "react-router-dom";
const shopContent = [
  { text: "Living room", href: "/living-room" },
  { text: "Bed room", href: "/bed-room" },
  { text: "Dining room", href: "/dining-room" },
  { text: "Home office", href: "/home-office" },
  { text: "Kitchen", href: "/kitchen" },
];
const aboutContent = [
  { text: "About Us", href: "#about-section" },
  { text: "Blogs", href: "/blogs" },
  { text: "Brouchers", href: "/brouchers" },
];
const policyContent = [
  { text: "Terms &  Condition", href: "/terms-condition" },
  { text: "Privacy policy", href: "/privacy-policy" },
  { text: "Order policy", href: "/order-policy" },
  { text: "Return policy", href: "/return-policy" },
  { text: "Waranty policy", href: "/waranty-policy" },
];
const helpContent = [
  { text: "Payment", href: "/payment" },
  { text: "Shipping", href: "/shipping" },
  { text: "FAQ's", href: "#faq-section" },
];
function Footer() {
  const navigate = useNavigate();
  const UserId = localStorage.getItem("authUser")
    ? JSON.parse(localStorage.getItem("authUser")).id
    : null;
  console.log("Footer User ID", UserId);
  const handleTrackOrder = () => {
    const storedUser = localStorage.getItem("authUser");

    if (!storedUser) {
      alert("Please login first");
      navigate("/", { replace: true });
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
      return;
    }

    navigate("/account", { state: { section: "orders" } });
  };
  return (
    <div className="footer py-5">
      <div className="logo-background"></div>
      <div className="footer-bottom-background"></div>
      <div className="footer-buliding-background"></div>
      <div className="footer-hall-background"></div>
      <div className="footer-right-top-background"></div>
      <div className="footer-right-down-background"></div>
      <div className="footer-container">
        <div className="footer-logo-text">
          <img src={footerImage} className="footer-logo" />
          <p>Premium knobs for every style and space.</p>

          <div className="my-3">
            <a
              href="https://www.instagram.com/knobsshop_official/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="bi bi-instagram insta-gram-icon"></i>
            </a>
          </div>
        </div>

        <div className="d-flex footer-menus flex-md-wrap">
          <div className="footer-shop-container">
            <h2>Shop</h2>
            <div className="shop-content">
              {shopContent.map((content, index) => (
                <a key={index} href={content.href}>
                  {content.text == "Brouchers" && !UserId ? "" : content.text}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-about-container">
            <h2>About</h2>
            <div className="about-content">
              {aboutContent.map((content, index) => {
                if (
                  content.text.trim().toLowerCase() === "brouchers" &&
                  !UserId
                ) {
                  return null;
                }

                return (
                  <a key={index} href={content.href}>
                    {content.text}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="footer-policy-container">
            <h2>Policy</h2>
            <div className="policy-content">
              {policyContent.map((content, index) => (
                <a key={index} href={content.href}>
                  {content.text}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-help-container">
            <h2>Help</h2>
            <div className="help-content">
              {helpContent.map((content, index) => (
                <a key={index} href={content.href}>
                  {content.text}
                </a>
              ))}
              <button
                onClick={handleTrackOrder}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  color: "inherit",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                Track My Order
              </button>
            </div>
          </div>

          <div className="contact-info-container">
            <h2>Contact Info</h2>
            <div className="icon-phone-number">
              <i className="bi bi-telephone-fill"></i>
              <div className="phone-number">
              <a href="tel:+917092466600" className="phone-link">
            70924 66600
          </a>
              </div>
            </div>
            <div className="icon-and-mail-id">
              <i className="bi bi-envelope-fill"></i>
              <div className="email-id">
                <p>ecom@knobsshop.store</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="email-section-footer">
        <h4>Sign Up to our Newsletter</h4>
        <p>
          Be the first to know the least releases,news,collabortions,exclusive
          and offers
        </p>
        <div className="footer-search-box-text">
          <input type="text" placeholder="Email" />
          <button>subscribe</button>
        </div>
      </div> */}
      <p className="text-center">
        Copyright <i className="bi bi-c-circle"></i> 2025{" "}
        <a href="https://knobsshop.com/" target="_blank" style={{ color: "#AB7B53" }}>Knobs Shop.</a> All Rights
        Reserved.
      </p>
    </div>
  );
}

export default Footer;
