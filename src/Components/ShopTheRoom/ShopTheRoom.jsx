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
];

const ShopTheRoom = () => {
  return (
    <section className="shop-the-room__section mt-4">
      <h2 className="shop-the-room__title">Shop The Room</h2>

      <div className="shop-the-room__room-container">
        <img src={roomImage} alt="Room" className="shop-the-room__image" />

        {decorPoints.map((item) => (
          <div
            key={item.id}
            className="shop-the-room__hotspot"
            style={{ top: item.position.top, left: item.position.left }}
          >
            <div className="shop-the-room__dot"></div>
            <div className="shop-the-room__card">
              <img src={item.image} alt={item.title} />
              <div className="shop-the-room__info">
                <p className="shop-the-room__category">{item.category}</p>
                <h4 className="shop-the-room__product-title">
                  {item.title.split(' ').slice(0, 3).join(' ')}<br />
                  {item.title.split(' ').slice(3).join(' ')}
                </h4>
                <p className="shop-the-room__price">{item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="shop-the-room__btn-container">
        <button className="shop-the-room__check-btn">Check All Products</button>
      </div>
    </section>
  );
};

export default ShopTheRoom;
