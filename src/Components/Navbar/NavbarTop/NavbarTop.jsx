import React, { useState,useEffect } from 'react';
import './NavbarTop.css';
import NavbarMiddle from '../NavbarMiddle/NavbarMiddle';
import facebook_icon from '../../../Assets/facebook-icon.svg';
import insta_icon from '../../../Assets/insta-icon.svg';
import mail_icon from '../../../Assets/mail-icon.svg';
import call_icon from '../../../Assets/call-icon.svg';
import NavbarBottom from '../NavbarBottom/NavbarBottom';
import { searchProductsByParam } from "../../../API/productApi";
import { useNavigate } from 'react-router-dom';
function NavbarTop() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentOffer, setCurrentOffer] = useState(0);
    const offers = [
        <>Welcome Bonus! Use <strong style={{ color: '#E18436' }}>KNOBSSHOP25</strong> on your first login & grab <strong style={{ color: '#E18436' }}>₹100 off instantly</strong></>,
<>Welcome Bonus! Use <strong style={{ color: '#E18436' }}>KNOBSSHOP25</strong> on your first login & grab <strong style={{ color: '#E18436' }}>₹100 off instantly</strong></>,
<>Welcome Bonus! Use <strong style={{ color: '#E18436' }}>KNOBSSHOP25</strong> on your first login & grab <strong style={{ color: '#E18436' }}>₹100 off instantly</strong></>,
      ];

      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentOffer((prev) => (prev + 1) % offers.length);
        }, 3000); // change every 3s
        return () => clearInterval(interval);
      }, []);

        // Debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim() !== "") {
        searchProducts();
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const searchProducts = async () => {
    try {
      setLoading(true);
      const res = await searchProductsByParam(query);
      console.log("API Response:", res);
      setResults(res?.results || []);
    } catch (error) {
      console.error("Search failed:", error);
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
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };
    return (
        <>
<div className="mobile-navbar-top-offer">
  <div className="news-ticker">
    <div className="ticker-content">
      {offers.map((offer, index) => (
        <span key={index} className="ticker-item">
          {offer}
        </span>
      ))}
    </div>
  </div>
</div>



            <div className='navbar-top-container'>
                <div className='navbar-top-phone-number'>
                    <img src={call_icon} alt="Call"/>
                    <a href="tel:+917092466600" className="phone-link">
            70924 66600
          </a>
                </div>

                <div className='navbar-top-offer'>
                    <p>Welcome Bonus! Use<strong style={{color:'#E18436'}}> KNOBSSHOP25 </strong> on your first login & grab <strong style={{color:'#E18436'}}> ₹100 off instantly </strong></p>
                </div>
                 <div className="navbar-mob-middle-search-box-icon my-1">
                 <input
  type="search"
  placeholder="Search"
  value={query}
  onChange={(e) => {
    console.log("Mobile input change:", e.target.value);
    setQuery(e.target.value);
  }}
  onKeyDown={handleKeyDown}
/>
          <i className="bi bi-search"onClick={handleSearchSubmit}></i>
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

                <div className='navbar-top-facebook-insta-icon-div'>
                    <div className='navbar-top-mail-id'>
                        <img src={mail_icon} alt="E-mail" />
                        <p>ecom@knobsshop.store</p>
                    </div>
                    <div className='navbar-top-facebook-insta-icon'>
                        {/* <img src={facebook_icon} alt="Facebook" /> */}
                        <a 
        href="https://www.instagram.com/knobsshop_official/" 
        target="_blank" 
        rel="noopener noreferrer"
    >
        <img src={insta_icon} alt="Instagram" />
    </a>
                    </div>
                </div>
            </div>
            {/* Pass menuOpen and setMenuOpen to NavbarMiddle */}
            <NavbarMiddle menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            {/* Pass menuOpen and setMenuOpen to NavbarBottom */}
            <NavbarBottom menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </>
    );
}

export default NavbarTop;