import React, { useRef, useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import './ProductTabs.css';
import ProductFeatures from './ProductFeatures';
import ProductSpecificationTable from './ProductSpecificationTable';
import YouTubeEmbed from '../YouTubeEmbed/YouTubeEmbed';
import ReviewSection from '../ReviewSection/ReviewSection';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../API/productApi';

export default function ProductTabs() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Description');
  const [product, setProduct] = useState(null);
  const tabRefs = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductById(id);
      console.log("data from desc",data)
      setProduct(data);
    };
    fetchData();
  }, [id]);

  const tabData = {
    Description: product?.description ? (
      <div className='mt-3' dangerouslySetInnerHTML={{ __html: product?.description }} />
    ) : (
      <p className="mt-3">No description available.</p>
    ),

    Features: <ProductFeatures />,

    'Technical Specification': product?.specifications?.length ? (
      <table className="table table-bordered mt-3">
        <tbody>
          {product.specifications.map((spec, index) => (
            <tr key={index}>
              <td><strong>{spec.label}</strong></td>
              <td>{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <ProductSpecificationTable />
    ),

    Video: product?.videoUrl ? (
      <YouTubeEmbed videoId={extractYouTubeVideoId(product.videoUrl)} />
    ) : (
      <p className='mt-3'>No product video available.</p>
    ),

    'Customer Reviews': <ReviewSection />,
  };

  const tabKeys = Object.keys(tabData);

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

  useEffect(() => {
    const tabButton = tabRefs.current[activeTab];
    if (tabButton && window.innerWidth < 768) {
      tabButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeTab]);

  function extractYouTubeVideoId(url) {
    const match = url?.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
  }

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
