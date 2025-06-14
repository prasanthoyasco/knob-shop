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
      <p className='mt-3'>
        YDME50 Nxt smart lock in brown color, is a smart and extremely convenient solution for your home.
        You can have all the various access options to enter your home either via our new biometric fingerprint scan,
        personalized PIN code.
      </p>
      <p className='mt-3'>
        With so many ways to unlock today's doors, the passcode (PIN) or fingerprint seem to be the best defense
        against intruders wanting access to your doors. With YDME 50NXT you can do just that and more with the
        fashionable and advanced touch keypad technology.
      </p>
      <ul className='mt-4'>
        <li className='my-2'><strong>Various Access:</strong> YDME 50Nxt has multiple options to access the lock – Fingerprint, Pin Code, RFID Card and Manual Key.</li>
        <li className='mb-2'><strong>Secure Fingerprint Access:</strong> Unlock your door with a precise and rapid one-touch fingerprint.</li>
        <li className='mb-2'><strong>Convenience:</strong> Upgrade your existing door lock (LH & RH) and supports thickness from 35mm to 65mm.</li>
        <li className='mb-2'><strong>Warning Alert:</strong> After 3 incorrect attempts, the door locks and sounds an alarm for 3 minutes.</li>
        <li className='mb-2'><strong>Low battery alarm:</strong> Warns in case of low battery. Uses 4× AA batteries. Retains credentials even after replacement.</li>
        <li className='mb-2'><strong>Emergency power supply:</strong> USB-based emergency power support available for lock access.</li>
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
