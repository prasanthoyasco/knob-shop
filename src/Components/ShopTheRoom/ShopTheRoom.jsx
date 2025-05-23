import React, { useRef, useState, useLayoutEffect } from 'react';
import './ShopTheRoom.css';
import roomImage from '../../Assets/room.jpg';
import tableImg from '../../Assets/table.png';
import sofaImg from '../../Assets/sofa.png';
import light_room from '../../Assets/light-room.png';

const decorPoints = [
   {
    id: 3,
    title: 'Cozy Gray Sofa',
    category: 'SEATING',
    price: '₹ 12,999.00',
    image: sofaImg,
    position: { top: '60%', left: '58%' },
  },
  {
    id: 2,
    title: 'Oak Bok White Décor Point',
    category: 'DÉCOR POINT',
    price: '₹ 1,500.00',
    image: light_room,
    position: { top: '40%', left: '26%' },
  },
 
  {
    id: 1,
    title: 'Oak Bok White Décor Point',
    category: 'DÉCOR POINT',
    price: '₹ 1,500.00',
    image: tableImg,
    position: { top: '68%', left: '34%' },
  },
];

const ShopTheRoom = () => {
  const defaultopen = decorPoints[0].id
  const [activeId, setActiveId] = useState(defaultopen);
  const [cardHeights, setCardHeights] = useState({});
  const cardRefs = useRef({});

  useLayoutEffect(() => {
    const activeRef = cardRefs.current[activeId];
    if (activeRef) {
      const height = activeRef.offsetHeight;
      setCardHeights((prev) => ({ ...prev, [activeId]: height }));
    }
  }, [activeId]);

  const getCardPositionClass = (leftPercent) => {
    const left = parseFloat(leftPercent);
    if (left < 33) return 'align-left';
    if (left > 66) return 'align-right';
    return 'align-center';
  };

  return (
    <section className="shop-the-room__section mt-4">
      <h2 className="shop-the-room__title">Shop The Room</h2>

      <div className="shop-the-room__room-container">
        <img src={roomImage} alt="Room" className="shop-the-room__image" />

        {decorPoints.map((item) => {
          const cardClass = getCardPositionClass(item.position.left);
          const ref = (el) => (cardRefs.current[item.id] = el);
          const heightOffset = (cardHeights[item.id] || 0) + 20;

          return (
            <div
              key={item.id}
              className="shop-the-room__hotspot"
              style={{ top: item.position.top, left: item.position.left }}
              onMouseEnter={() => setActiveId(item.id)}
              onClick={() => setActiveId(item.id)}
            >
              <div className="shop-the-room__dot">
                <div className="shop-the-room_inner_dot"></div>
              </div>

              {activeId === item.id && (
                <div
                  className={`shop-the-room__card ${cardClass}`}
                  ref={ref}
                  style={{ top: `-${heightOffset}px` }}
                >
                  <div className="w-50 shop-the-room-image-wrapper">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="shop-the-room__info">
                    <p className="shop-the-room__category">{item.category}</p>
                    <h4 className="shop-the-room__product-title">
                      {item.title.split(' ').slice(0, 3).join(' ')}<br />
                      {item.title.split(' ').slice(3).join(' ')}
                    </h4>
                    <p className="shop-the-room__price">{item.price}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="shop-the-room__btn-container">
        <button className="shop-the-room__check-btn">Check All Products</button>
      </div>
    </section>
  );
};

export default ShopTheRoom;
