import React, { useState } from 'react';
import './ProductTabs.css';
import ProductFeatures from './ProductFeatures';
import ProductSpecificationTable from './ProductSpecificationTable';

const tabData = {
  Description: (
    <>
      <p>
        YDME50 Nxt smart lock in brown color, is a smart and extremely convenient solution for your home.
        You can have all the various access options to enter your home either via our new biometric fingerprint scan,
        personalized PIN code.
      </p>
      <p>
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
  Features: <ProductFeatures/>,
  'Technical Specification':<ProductSpecificationTable/>,
  Video: <p>Embedded product demo video will appear here.</p>,
  'Customer Reviews': <p>Customer reviews and ratings will be displayed here.</p>,
};

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState('Description');

  return (
    <div className="product-tabs my-2 mt-md-5 mx-4">
      <ul className="nav nav-tabs justify-content-start">
        {Object.keys(tabData).map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content border-noborder p-4 bg-white">
        {tabData[activeTab]}
      </div>
    </div>
  );
}
