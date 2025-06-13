import React, { useState } from 'react';
import './ProductDetailsHead.css'; // Custom styles

export default function ProductDetailsHead() {
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');

  const handleColorChange = (color) => setSelectedColor(color);

  return (
    <div className="container-flued py-4 px-5">
      <nav className="breadcrumb mb-4">
        <span className="breadcrumb-item">Home</span>
        <span className="breadcrumb-item">Shop by Categories</span>
        <span className="breadcrumb-item">Digital Lockers</span>
        <span className="breadcrumb-item active">YDME100NxT</span>
      </nav>

      <div className="row">
        {/* Images */}
        <div className="col-md-6">
          <div className="d-flex gap-4">
             <div className="d-flex gap-3 flex-column">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src="https://placehold.co/100"
                alt="Thumb"
                className="img-thumbnail small-thumb"
              />
            ))}
          </div>
            <div className="product-image mb-3">
            <img
              src="https://placehold.co/700x700"
              alt="Main Product"
              className="img-fluid main-image"
            />
          </div>
          </div>
        </div>

        {/* Details */}
        <div className="col-md-6">
  {/* Brand & Action Icons */}
  <div className="d-flex align-items-center justify-content-between mb-2">
    <p className="text-muted mb-1 fw-semibold">Brand : Yale</p>
    <div className="d-flex gap-3">
      <img src="/share.svg" alt="Share" className="cursor-pointer" />
      <img src="/wishList.svg" alt="Wishlist" className="cursor-pointer" />
    </div>
  </div>

  {/* Title */}
  <h3 className="fw-bold mb-2">YDME50NxT Smart Door Lock</h3>

  {/* Ratings */}
  <div className="d-flex align-items-center mb-2">
    <span className="text-warning me-2 fs-5">★ ★ ★ ★ ☆</span>
    <span className="text-muted fw-medium">4.5</span>
    <span className="mx-2 text-muted">|</span>
    <span className="text-muted">Write a review</span>
  </div>

<div className="mb-3 d-flex gap-2">
    <img src="/up-arrow.svg" alt="" style={{height:"18px"}} /><span className="text-muted" style={{fontSize:"12px"}}>Ordered by 39 Customers</span>
</div>
  {/* Price Section */}
  <div className="mb-3">
    <h4 className="fw-bold d-flex align-items-center">
      <span style={{color:"#D6791F"}}>₹ 89,299 </span><span className="fw-semibold ms-2" style={{color:'#009EBA',fontSize:'14px'}}>05% OFF</span>
    </h4>
    <p className="text-muted">
      MRP: ₹ <s>90,000</s> <span className="text-success fw-semibold ms-2">You Save ₹ 701</span>
    </p>
    <p className="text-muted smaller" style={{fontSize:'10px'}}>Inclusive of all taxes</p>
  </div>

  {/* Color Selector */}
  <div className="mb-2">
    <p className="text-muted mb-2">Color: <span className="fw-semibold">Black & Gray Pattern</span></p>
    <div className="d-flex gap-2">
      <button
        className={`rounded-circle radio border ${selectedColor === 'black' ? 'border-dark p-1' : ''}`}
        style={{ backgroundColor: '#000', width: 24, height: 24 }}
        onClick={() => handleColorChange('black')}
      />
      <button
        className={`rounded-circle radio border ${selectedColor === 'gray' ? 'border-dark p-1' : ''}`}
        style={{ backgroundColor: '#ddd', width: 24, height: 24 }}
        onClick={() => handleColorChange('gray')}
      />
    </div>
  </div>

  {/* Quantity + Add to Cart */}
  <div className="d-flex align-items-center mb-2 gap-3">
    <div className="border rounded-pill d-flex align-items-center gap-2 px-3 my-3" style={{ height: 50 }}>
      <button onClick={() => setQuantity(prev => Math.max(prev - 1, 1))} className="btn btn-sm px-2">−</button>
      <span className="px-3">{quantity}</span>
      <button onClick={() => setQuantity(prev => prev + 1)} className="btn btn-sm px-2">＋</button>
    </div>
    <button className="btn btn-dark py-3 m-0 rounded-pill" style={{padding: "0 6rem"}}>ADD TO CART</button>
  </div>

  {/* Payment Icons */}
  <div className="d-flex gap-2 mb-3">
    <img src="/payment-icon/visa.svg" alt="Visa" height={38} />
    <img src="/payment-icon/paypal.svg" alt="PayPal" height={38} />
    <img src="/payment-icon/master.svg" alt="Master" height={38} />
    <img src="/payment-icon/discover.svg" alt="Discover" height={38} />
  </div>

  {/* Features */}
  <div className="d-flex justify-content-between gap-2 border rounded px-3 py-2 mb-3 fw-semibold" style={{ fontSize: "14px",width:"100%" }}>
    <div className="d-flex align-items-center flex-row gap-2">
       <div className="rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: 34, height: 34,border:'1px solid #515151',background:"#F8F8F8" }}>
    <img src="/product-icon/fingerprint.svg" alt="Fingerprint" height={20} />
  </div>
      Fingerprint
    </div>
    <div className="d-flex align-items-center flex-row gap-2">
        <div className="rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: 34, height: 34,border:'1px solid #515151',background:"#F8F8F8" }}>
      <img src="/product-icon/card_key.svg" alt="Card Access" height={20} />
      </div>
      Manual Card Access
    </div>
    <div className="d-flex align-items-center flex-row gap-2">
        <div className="rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: 34, height: 34,border:'1px solid #515151',background:"#F8F8F8" }}>
      <img src="/product-icon/machnic_key.svg" alt="Manual Key" height={20} />
      </div>
      Manual Key Access
    </div>
    <div className="d-flex align-items-center flex-row gap-2">
        <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: 34, height: 34,border:'1px solid #515151',background:"#F8F8F8" }}>
      <img src="/product-icon/pin_code.svg" alt="RFID" height={20} />
      </div>
      RFID
    </div>
  </div>

  {/* Pincode Checker */}
  <div className="mb-3">
  <div className="d-flex" style={{ border: '1px solid #ccc', borderRadius: '999px', overflow: 'hidden', maxWidth: '300px' }}>
    <input
      type="text"
      className="form-control border-0 py-2 px-3"
      placeholder="Enter pincode"
      value={pincode}
      onChange={(e) => setPincode(e.target.value)}
      style={{ borderRadius: '0', boxShadow: 'none' }}
    />
    <button className="btn text-white px-4" style={{ backgroundColor: '#212121', borderRadius: 0 }}>
      CHECK
    </button>
  </div>
  <p className="text-success mt-2 fw-semibold">Hurray!! Delivery is available!</p>
</div>

</div>

      </div>
    </div>
  );
}
