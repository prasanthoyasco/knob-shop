import React, { useState } from 'react';
import './ProductDetailsHead.css'; // Custom styles

export default function ProductDetailsHead() {
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');

  const handleColorChange = (color) => setSelectedColor(color);
  const handleQuantityChange = (e) => setQuantity(e.target.value);

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
            {[...Array(6)].map((_, i) => (
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
              src="https://placehold.co/600x600"
              alt="Main Product"
              className="img-fluid main-image"
            />
          </div>
          </div>
        </div>

        {/* Details */}
        <div className="col-md-6">
          <div className="d-flex align-items-center justify-content-between mb-2"><p className="text-muted mb-1">Brand: Yale</p>
          <div className="d-inline-flex gap-3">
            <img src="/share.svg" alt="" className='curser-pointer' />
            <img src="/wishList.svg" alt="" className='curser-pointer' />


</div></div>
          <h3 className="fw-bold">YDME50NxT Smart Door Lock</h3>
          <div className="d-flex align-items-center mb-2">
            <span className="text-warning me-2">★ ★ ★ ★ ☆</span>
            <span className="text-muted">4.5 (39 Orders)</span>
          </div>

          <div className="price-section mb-3">
            <h4 className="text-danger">₹ 89,299 <span className="badge bg-success text-white ms-2">05% OFF</span></h4>
            <p className="text-muted">MRP: ₹ 94,000 <s className="ms-2">Save ₹ 701</s></p>
          </div>

          <div className="mb-3">
            <p className="fw-semibold mb-1">Color:</p>
            <div className="d-flex gap-2">
              <div
                className={`color-circle ${selectedColor === 'black' ? 'active' : ''}`}
                style={{ backgroundColor: '#000' }}
                onClick={() => handleColorChange('black')}
              />
              <div
                className={`color-circle ${selectedColor === 'gray' ? 'active' : ''}`}
                style={{ backgroundColor: '#aaa' }}
                onClick={() => handleColorChange('gray')}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Quantity</label>
            <input
              type="number"
              className="form-control w-25"
              value={quantity}
              onChange={handleQuantityChange}
              min={1}
            />
          </div>

          <div className="d-grid mb-3">
            <button className="btn btn-dark">Add to Cart</button>
          </div>

          <div className="d-flex gap-3 mb-3 icons-section">
            <span><img src="/public/product-icon/fingerprint.svg" alt="" style={{height:"22px",marginRight:'10px'}}/> Fingerprint</span>
            <span><img src="/public/product-icon/machnic_key.svg" alt=""style={{height:"22px",marginRight:'10px'}} /> Manual Access</span>
            <span><img src="/public/product-icon/pin_code.svg" alt="" style={{height:"22px",marginRight:'10px'}}/> Key Access</span>
            <span><img src="/public/product-icon/card_key.svg" alt="" style={{height:"22px",marginRight:'10px'}}/> RFID</span>
          </div>

          <div className="pincode-check">
            <label className="form-label fw-semibold">Enter Pincode</label>
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control w-50"
                placeholder="e.g. 560001"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              <button className="btn btn-outline-success">Check</button>
            </div>
            <p className="text-success mt-2">Hurray! Delivery is available.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
