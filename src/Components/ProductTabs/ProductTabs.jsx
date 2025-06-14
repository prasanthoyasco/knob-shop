import React, { useRef, useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import './ProductTabs.css';
import ProductFeatures from './ProductFeatures';
import ProductSpecificationTable from './ProductSpecificationTable';
import YouTubeEmbed from '../YouTubeEmbed/YouTubeEmbed';
import ReviewSection from '../ReviewSection/ReviewSection';

const tabData = {
  Description: (
    <>
      <p>
        YDME50 Nxt smart lock in brown color, is a smart and extremely convenient solution for your home.
      </p>
      <ul className='mt-4'>
        <li><strong>Various Access:</strong> Fingerprint, Pin Code, RFID Card and Manual Key.</li>
        <li><strong>Secure Fingerprint Access:</strong> Unlock your door with a rapid one-touch fingerprint.</li>
      </ul>
    </>
  ),
  Features: <ProductFeatures />,
  'Technical Specification': <ProductSpecificationTable />,
  Video: <YouTubeEmbed videoId="lc1msHWRvjw" />,
  'Customer Reviews': <ReviewSection />,
};

const tabKeys = Object.keys(tabData);

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState('Description');
  const tabRefs = useRef({});

  const currentIndex = tabKeys.indexOf(activeTab);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < tabKeys.length - 1) {
        setActiveTab(tabKeys[currentIndex + 1]);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        setActiveTab(tabKeys[currentIndex - 1]);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
  });

  // 🔄 Scroll active tab into view on mobile when changed
  useEffect(() => {
    const tabButton = tabRefs.current[activeTab];
    if (tabButton && window.innerWidth < 768) {
      tabButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeTab]);

  return (
    <div className="product-tabs my-2 mt-md-5 mx-4">
      <ul className="nav nav-tabs justify-content-start">
        {tabKeys.map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              ref={(el) => (tabRefs.current[tab] = el)}
              className={`nav-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      <div
        {...swipeHandlers}
        className="tab-content border-noborder p-2 p-md-4 bg-white"
        style={{ touchAction: 'pan-y' }}
      >
        {tabData[activeTab]}
      </div>
    </div>
  );
}
