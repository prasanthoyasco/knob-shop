import React from 'react';
import './ShopTheRoom.css';
import roomImage from '../../Assets/room.jpg';
import tableImg from '../../Assets/table.png';
import sofaImg from '../../Assets/sofa.png';

const decorPoints = [
  {
    id: 1,
    title: 'Oak Bok White Décor Point',
    category: 'DÉCOR POINT',
    price: '₹ 1,500.00',
    image: tableImg,
    position: { top: '45%', left: '28%' },
  },
  {
    id: 2,
    title: 'Cozy Gray Sofa',
    category: 'SEATING',
    price: '₹ 12,999.00',
    image: sofaImg,
    position: { top: '60%', left: '55%' },
  },
  // Add more products as needed
];

const ShopTheRoom = () => {
  return (
    <section className="shop-room-section mt-4">
      <h2 className="section-title">Shop The Room</h2>

      <div className="room-container">
        <img src={roomImage} alt="Room" className="room-image" />

        {decorPoints.map((item) => (
          <div
            key={item.id}
            className="hotspot"
            style={{ top: item.position.top, left: item.position.left }}
          >
            <div className="dot"></div>
            <div className="product-card">
              <img src={item.image} alt={item.title} />
              <div className="product-info">
                <p className="product-category">{item.category}</p>
                <h4 className="product-title">
                  {item.title.split(' ').slice(0, 3).join(' ')}<br />
                  {item.title.split(' ').slice(3).join(' ')}
                </h4>
                <p className="product-price">{item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="btn-container">
        <button className="check-products-btn">Check All Products</button>
      </div>
    </section>
  );
};

export default ShopTheRoom;
