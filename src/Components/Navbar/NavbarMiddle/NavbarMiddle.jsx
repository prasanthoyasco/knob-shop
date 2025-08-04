import React,{useState,useEffect} from "react";
import "./NavbarMiddle.css";
import logoImage from "../../../Assets/logo.png";
import cart_icon from "../../../Assets/cart-icon.svg";
import heart_icon from "../../../Assets/heart-icon.svg";
import profile_icon from "../../../Assets/profile-icon.svg";
import { useCart } from "../../../Context/CartContext"; 
import { useNavigate } from "react-router-dom";
import { searchProductsByParam } from "../../../API/productApi";
function NavbarMiddle() {
  const { cartItems, toggleDrawer } = useCart(); 
  const navigate = useNavigate()
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Debounce search (optional but recommended)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim() !== "") {
        searchProducts();
      } else {
        setResults([]);
      }
    }, 300); // delay in ms

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const searchProducts = async () => {
    try {
      const res = await searchProductsByParam(query);
      console.log("query",res)
      setResults(res?.results || []);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };
  const handleSearchSubmit = () => {
    if (query.trim()) {
      navigate(`/products/search/${encodeURIComponent(query.trim())}`);
      setResults([]);
      setQuery("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };
  return (
    <>
      <div className="navbar-middle-container">
        <div className="navbar-middle-logo-wrapper">
          <a href="/">
            <img src={logoImage} alt="Logo" className="navbar-middle-logo" />
          </a>
        </div>

        <div className="navbar-middle-search-box-icon search-wrapper">
          <input type="search" placeholder="Search"value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}/>
          <i className="bi bi-search" onClick={handleSearchSubmit}></i>
                    {/* Search Result Dropdown (optional styling needed) */}
                    {query && results.length > 0 && (
  <ul className="search-results-dropdown">
    {results.map((item) => (
      <li key={item._id} onClick={() => navigate(`/product/${item._id}`)}>
<img
  src={
    item?.images?.[0] ||                        // First product image
    item?.category?.categoryImageUrl ||         // Fallback to category image
    "/fallback.jpg"                             // Final fallback image
  }
  alt={item.name}
/>

        <span>{item.name}</span>
      </li>
    ))}
  </ul>
)}

        </div>

        <div className="heart-cart-person-signIn-icon">
          {/* Wishlist Icon */}
          <div className="icon-wrapper">
            <img src={heart_icon} alt="Wishlist" />
            <span className="count-badge">5</span> {/* Replace with real wishlist count later */}
          </div>

          {/* Cart Icon with real count & click to open drawer */}
          <div className="icon-wrapper" onClick={() => toggleDrawer(true)} style={{ cursor: "pointer" }}>
            <img src={cart_icon} alt="Cart" />
            {cartItems.length > 0 && (
              <span className="count-badge">{cartItems.length}</span>
            )}
          </div>

          {/* Profile Section */}
          <div className="profile" onClick={()=>navigate('/auth/register')}>
            <img src={profile_icon} alt="Profile" />
            <div>
              <p>Sign in</p>
              <h6>Account</h6>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default NavbarMiddle;
