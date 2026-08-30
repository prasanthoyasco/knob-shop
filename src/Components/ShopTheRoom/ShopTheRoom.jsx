import React, { useRef, useState, useLayoutEffect } from 'react';
import './ShopTheRoom.css';
import roomImage from '../../Assets/room.jpg';
import tableImg from '../../Assets/table.png';
import sofaImg from '../../Assets/sofa.png';
import light_room from '../../Assets/light-room.png';
import { useNavigate } from 'react-router-dom';

const decorPoints = [
    {
    id: 6,
    title: 'TV Unit',
    // category: 'DÉCOR POINT',
    price: '₹ 49,500',
    image: "https://img.freepik.com/free-photo/marble-wall-living-room-mock-up_43614-920.jpg?uid=R175611833&ga=GA1.1.1276842385.1760516584&semt=ais_hybrid&w=740&q=80",
    position: { top: '39%', left: '42%' },
  },
    {
    id: 4,
    title: 'Sofa',
    // category: 'DÉCOR POINT',
    price: '₹ 50,000',
    image: sofaImg,
    position: { top: '73%', left: '29%' },
  },
  {
    id: 3,
    title: 'Paneling',
    // category: 'SEATING',
    price: '₹ 41,589',
    image: "https://img.freepik.com/premium-photo/imagepng_660869-5630.jpg?uid=R175611833&ga=GA1.1.1276842385.1760516584&semt=ais_hybrid&w=740&q=80",
    position: { top: '40%', left: '55%' },
  },
  {
    id: 2,
    title: 'Curtain',
    // category: 'DÉCOR POINT',
    price: '₹ 14,999',
    image: "https://img.freepik.com/free-photo/curtain-with-sunlight_1339-4061.jpg?uid=R175611833&ga=GA1.1.1276842385.1760516584&semt=ais_hybrid&w=740&q=80",
    position: { top: '29%', left: '15%' },
  },
  {
    id: 1,
    title: 'Lamp',
    // category: 'DÉCOR POINT',
    price: '₹ 3,999',
    image: "https://img.freepik.com/free-psd/modern-tripod-floor-lamp-with-white-shade_191095-80733.jpg?uid=R175611833&ga=GA1.1.1276842385.1760516584&semt=ais_hybrid&w=740&q=80",
    position: { top: '60%', left: '12%' },
  },
  {
    id: 5,
    title: 'False Ceiling',
    // category: 'DÉCOR POINT',
    price: '₹ 34,000',
    image: "https://img.freepik.com/premium-photo/classic-empty-room-with-washroom-view_124907-68.jpg?uid=R175611833&ga=GA1.1.1276842385.1760516584&semt=ais_hybrid&w=740&q=80",
    position: { top: '10%', left: '50%' },
  },

  {
    id: 7,
    title: 'Drawer Unit',
    // category: 'DÉCOR POINT',
    price: '₹ 18,500',
    image: "https://img.freepik.com/premium-photo/filing-cabinet-with-white-background-natural-wood_1231117-15891.jpg?uid=R175611833&ga=GA1.1.1276842385.1760516584&semt=ais_hybrid&w=740&q=80",
    position: { top: '65%', left: '50%' },
  },
  {
    id: 8,
    title: 'Corner Table',
    // category: 'DÉCOR POINT',
    price: '₹ 14,999',
    image: "https://img.freepik.com/premium-photo/black-table-with-plant-it-pot-green-plant-it_249848-6222.jpg?uid=R175611833&ga=GA1.1.1276842385.1760516584&semt=ais_hybrid&w=740&q=80",
    position: { top: '78%', left: '69%' },
  },
  {
    id: 9,
    title: 'Door',
    // category: 'SEATING',
    price: '₹ 23,999',
    image: "https://img.freepik.com/premium-vector/vector-wood-open-door-with-frame-isolated_212889-726.jpg?uid=R175611833&ga=GA1.1.1276842385.1760516584&semt=ais_hybrid&w=740&q=80",
    position: { top: '40%', left: '65%' },
  },
  {
    id: 10,
    title: 'Handle',
    // category: 'SEATING',
    price: '₹ 9750',
    image: "https://img.freepik.com/premium-photo/elegant-side-view-classic-door-handle-isolated-white-background-aspect-ratio-32_983420-235216.jpg?uid=R175611833&ga=GA1.1.1276842385.1760516584&semt=ais_hybrid&w=740&q=80",
    position: { top: '54%', left: '62%' },
    link:"/category/68e3b3ef2fd5b8167441a5bb"
  },
  {
    id: 11,
    title: 'Window Glass',
    // category: 'SEATING',
    price: '₹ 1999',
    image: "https://img.freepik.com/free-photo/city-square_1359-559.jpg?uid=R175611833&ga=GA1.1.1276842385.1760516584&semt=ais_hybrid&w=740&q=80",
    position: { top: '40%', left: '82%' },
  },
  {
    id: 12,
    title: 'Handle',
    // category: 'SEATING',
    price: '₹ 200',
    image: "https://img.freepik.com/premium-photo/minimalist-2d-illustration-acrylic-door-handle-white-background_899449-93908.jpg?uid=R175611833&ga=GA1.1.1276842385.1760516584&semt=ais_hybrid&w=740&q=80",
    position: { top: '47%', left: '87%' },
    link:"/category/68e4f55e34adbedb5930bf3a"
  },
];

const ShopTheRoom = () => {
  const navigate = useNavigate();
  const defaultopen = decorPoints[0].id;
  const [activeId, setActiveId] = useState(defaultopen);
  const [cardHeights, setCardHeights] = useState({});
  const [cardDirections, setCardDirections] = useState({});
  const cardRefs = useRef({});
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const activeRef = cardRefs.current[activeId];
    const container = containerRef.current;

    if (activeRef && container) {
      const cardRect = activeRef.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const overflowsTop = cardRect.top < containerRect.top;

      setCardHeights((prev) => ({
        ...prev,
        [activeId]: activeRef.offsetHeight,
      }));

      setCardDirections((prev) => ({
        ...prev,
        [activeId]: overflowsTop ? 'bottom' : 'top',
      }));
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

      <div className="shop-the-room__room-container" ref={containerRef} data-aos="fade-down" data-aos-delay='200'>
        <img src="/showRoom.png" alt="Room" className="shop-the-room__image" />

        {decorPoints.map((item) => {
          const cardClass = getCardPositionClass(item.position.left);
          const ref = (el) => (cardRefs.current[item.id] = el);
          const heightOffset = (cardHeights[item.id] || 0) + 5;
          const direction = cardDirections[item.id] || 'top';
          const cardStyle = {
            top: direction === 'top' ? `-${heightOffset}px` : '5px',
            cursor: 'pointer',
          };

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
                  className={`shop-the-room__card ${cardClass} ${direction === 'bottom' ? 'bottom' : ''}`}
                  ref={ref}
                  style={cardStyle}
                  onClick={()=>navigate(item.link)}
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
        <button className="shop-the-room__check-btn" onClick={() => navigate('/category/all-products')}>Check All Products</button>
      </div>
    </section>
  );
};

export default ShopTheRoom;
