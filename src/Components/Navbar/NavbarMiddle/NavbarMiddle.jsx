import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Heart, ShoppingCart, User, UserCheck, } from "lucide-react";
import "./NavbarMiddle.css";
import logoImage from "../../../Assets/logo.png";
import { useCart } from "../../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { searchProductsByParam } from "../../../API/productApi";
import { useWishlist } from "../../../Context/WishlistContext";

function NavbarMiddle() {
  const { cartItems, toggleDrawer } = useCart();
  const { wishlistItems, toggleDrawer: toggleWishlistDrawer } = useWishlist();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [user, setUser] = useState(null);

  // animation controller for icons
  const controls = useAnimation();

  // Sequential bounce loop: Heart → Cart → User → repeat
  useEffect(() => {
    const sequence = async () => {
      while (true) {
        await controls.start((i) =>
          i === 0 ? { y: [0, -6, 0], transition: { duration: 0.4 } } : {}
        );
        await controls.start((i) =>
          i === 1 ? { y: [0, -6, 0], transition: { duration: 0.4 } } : {}
        );
        await controls.start((i) =>
          i === 2 ? { y: [0, -6, 0], transition: { duration: 0.4 } } : {}
        );
        await new Promise((r) => setTimeout(r, 300)); // short pause between loops
      }
    };
    sequence();
  }, [controls]);

  // load user
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Invalid user data in localStorage", err);
      }
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) {
        searchProducts();
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [query]);

  const searchProducts = async () => {
    try {
      setLoading(true);
      const res = await searchProductsByParam(query);
      setResults(res?.results || []);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = () => {
    if (query.trim()) {
      navigate(`/products/search/${encodeURIComponent(query.trim())}`);
      setQuery("");
      setResults([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearchSubmit();
  };

  return (
    <>
      <div className="navbar-middle-container">
        {/* Logo */}
        <div className="navbar-middle-logo-wrapper">
          <a href="/">
            <img src={logoImage} alt="Logo" className="navbar-middle-logo" />
          </a>
        </div>

        {/* Search Box */}
        <div className="navbar-middle-search-box-icon search-wrapper">
          <input
            type="search"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <i className="bi bi-search" onClick={handleSearchSubmit}></i>

          {/* Dropdown Results */}
          {query && (
            <ul className="search-results-dropdown">
              {loading ? (
                <li className="search-loading">Searching...</li>
              ) : results.length > 0 ? (
                results.map((item) => (
                  <li
                    key={item._id}
                    onClick={() => {
                      navigate(`/product/${item._id}`);
                      setQuery("");
                      setResults([]);
                    }}
                  >
                    <img
                      src={
                        item?.images?.[0] ||
                        item?.category?.categoryImageUrl ||
                        "/fallback.jpg"
                      }
                      alt={item.name}
                    />
                    <span>{item.name}</span>
                  </li>
                ))
              ) : (
                <li className="search-no-results">No results found.</li>
              )}
            </ul>
          )}
        </div>

        {/* Icons */}
        <div className="heart-cart-person-signIn-icon">
          {/* Wishlist */}
          <motion.div
            custom={0}
            animate={controls}
            className="icon-wrapper"
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => toggleWishlistDrawer(true)}
            style={{
              cursor: "pointer",
              position: "relative",
              borderRadius: "50%",
              padding: "6px",
            }}
          >
            <Heart
              size={26}
              strokeWidth={2}
              color={wishlistItems.length > 0 ? "#FF0000" : "#FF0000"}
              fill={wishlistItems.length > 0 ? "#FF0000" : "none"}
            />
            {wishlistItems.length > 0 && (
              <motion.span
                className="count-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {wishlistItems.length}
              </motion.span>
            )}
          </motion.div>

          {/* Cart */}
          <motion.div
            custom={1}
            animate={controls}
            className="icon-wrapper"
            whileTap={{ scale: 0.85 }}
            whileHover={{scale: 1.05 }}
            onClick={() => toggleDrawer(true)}
            style={{
              cursor: "pointer",
              position: "relative",
              borderRadius: "50%",
              padding: "6px",
            }}
          >
            <ShoppingCart
              size={26}
              strokeWidth={2}
              color={cartItems.length > 0 ? "#e18436" : "#e18436"}
              fill={cartItems.length > 0 ? "#e18436" : "none"}
            />
            {cartItems.length > 0 && (
              <motion.span
                className="count-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {cartItems.length}
              </motion.span>
            )}
          </motion.div>

          {/* Profile */}
          <motion.div
            custom={2}
            animate={controls}
            className="profile"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={() =>
              user ? navigate("/account") : navigate("/auth/register")
            }
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              borderRadius: "12px",
              padding: "6px 10px",
              gap: "6px",
            }}
          >
            {user ? (
              <UserCheck size={26} strokeWidth={2} color="#e18436"  />
            ) : (
              <User size={26} strokeWidth={2} color="#222" />
            )}
            <div>
              {user ? (
                <>
                  <p className="username opacity-75">Hello,</p>
                  <h6 className="username opacity-75">{user.name.slice(0, 8) + "..."}</h6>
                </>
              ) : (
                <>
                  <p>Sign in</p>
                  <h6>Account</h6>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default NavbarMiddle;
