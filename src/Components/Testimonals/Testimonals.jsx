import React, { useState, useEffect, useRef } from 'react';
import './Testimonals.css';
import testinomalImage1 from '../../Assets/Textimonis/1.Jegan Jeyaseelan.jpeg';
import testinomalImage2 from '../../Assets/Textimonis/Biju G.JPG';
import testinomalImage4 from '../../Assets/Textimonis/Chandra Varatharajan.png';
import testinomalImage3 from '../../Assets/Textimonis/Santhana Selvan J.JPG';
import testinomalImage5 from '../../Assets/Textimonis/RAHUL RANKA.JPG';
import testinomalImage6 from '../../Assets/Textimonis/Sharavana Nanjundanar.JPG';
import testinomalImage7 from '../../Assets/Textimonis/KARTHI A.P.jpg';
import testinomalImage8 from '../../Assets/Textimonis/Mahendran Raghavan.jpg';
import testinomalImage9 from '../../Assets/Textimonis/CHRISTOPHER RAJKUMAR C.jpg';
import testinomalImage10 from '../../Assets/Textimonis/SRINIVASAN R.jpg';
import testinomalImage11 from '../../Assets/Textimonis/Yuvaraj K..jpg';
import testinomalImage12 from '../../Assets/Textimonis/Nagarajan M.jpg';
import testinomalImage13 from '../../Assets/Textimonis/Karthikeyan T.JPG';
import testinomalImage14 from '../../Assets/Textimonis/Nivas S.JPG';
import testinomalImage15 from '../../Assets/Textimonis/Bhavesh Mehta.jpg';
import testinomalImage16 from '../../Assets/Textimonis/Mahesh Prasanna.jpg';
import testinomalImage17 from '../../Assets/Textimonis/MR.Visagamuruthi.jpg';
import testinomalImage18 from '../../Assets/Textimonis/SANJEEV M.jpg';
import testinomalImage19 from '../../Assets/Textimonis/Dr. Kalaivani R..JPG';
import testinomalImage20 from '../../Assets/Textimonis/K Saravanan.jpg';
import testinomalImage21 from '../../Assets/Textimonis/Neeraj Shankla.jpg';
const testimonials = [
  {
    idx:0,
    imgage: testinomalImage1,
    name: "Jegan Jeyaseelan",
    profession : "CIVIL DOCTOR",
    message: "I am Jegan from Civil Doctor, we do waterproofing, epoxy flooring and thermal insulation coatings. I recommended Mr. Sailesh of Knob Shop to my Known Engineer for all his hardwares, knobs purchase."
  },
  {
    idx: 1,
    imgage: testinomalImage2,
    name: "Biju G",
    profession: "BABA Timbers",
    message: `
      I am Biju.G from BABA TIMBERS, we are the dealers of Imported round logs, Sizes and Doors.
      Where I got a good feedback from him. So I purchased hardware fittings from him, where I got
      a good response from him and got a greater discounts.
    `
  },  
  {
    idx:2,
    imgage: testinomalImage3,
    name: "Santhana Selvan J",
    profession: "ICONN HOMES & REALTORS",
    message:`
    ICONN HOMES & REALTORS has emerged as one of the respected builders in Coimbatore. As
a builder, we are highly in need of hardware materials. That gives us an opportunity to buy
materials like door handles, etc. from Sailesh Golcha’s Knobs Shop.
    `
  },
  {
    idx:3,
    imgage: testinomalImage5,
    name: "RAHUL RANKA",
    profession: "HARSHAVARDHAN",
    message:`
    i am rahul ranka and i represent harshavardhan.we have recently used the services of mr sailesh
for our new flat at rs puram.the kind of range and quality mr sailesh holds is really amazing.. i wish him all the best for all his future
endeavours.

    `
  },
  {
    idx:0,
    imgage: testinomalImage6,
    name: "Sharavana Nanjundanar",
    profession: "Global Coatings",
    message:`
    We from the House of Global Coatings, The Paint Studio take this Opportunity to Thank and
Appreciate Mr. Sailesh Golcha of “Knob Shop”.We thank Mr.Sailesh Golcha for the sincerity, product knowledge and service extended to us. 
    `
  },
  {
    idx: 1,
    imgage: testinomalImage7,
    name: "KARTHI A.P",
    profession: "FORESIGHT CORPORATION",
    message:`
    I will strongly
    recommend Mr. SAILESH GOLCHA, KNOB SHOP to any project and I am sure that he would
    complete every project in style, the way he did it for me.
    
    `
  },
  {
    idx: 2,
    imgage: testinomalImage8,
    name: "Mahendran Raghavan",
    profession: "MAsquare Engineers Pvt Ltd",
    message: `
    I am Er.Mahendran, Civil & Structural Consultant from Masquare Engineering services. We are
doing civil consulting & Structural design services for all kind of buildings and Industrial. 
    `
  },
  {
    idx: 3,
    imgage: testinomalImage9,
    name: "CHRISTOPHER RAJKUMAR C",
    profession: "FORESIGHT CORPORATION",
    message:`
    one of our client Ms. Gokilavani for Shower cubical accessories needs. The quality of the
material is good, and the rates are very competative. The products were delivered. And my client
is very happy
    `
  },
  {
    idx: 0,
    imgage: testinomalImage10,
    name: "SRINIVASAN R",
    profession: "PEOPLE POINT",
    message:`
    Srinivasan from People point into staffing, training and outsourcing services…… From doorman
lock to treasure chest fixtures, Knob shop has all !! A Friend, from another member of BNI
Fraternity, had an apartment made.
    `
  },
  {
    idx: 1,
    imgage: testinomalImage11,
    name: "Yuvaraj K.",
    profession: "TKT Chamber Bricks",
    message:`
    The products looks very
    heigh quality and amazing collections. Mr. SAILESH GOLCHA help us to make our home to
    look different elegant from others. He has given a fantastic service.
    `
  },
  {
    idx: 2,
    imgage: testinomalImage12,
    name: "Nagarajan M    ",
    profession: "Annam Associates",
    message:`
    I'm Nagaraj representing Annam Associates, an Office Space Furniture Turnkey Solution
    Provider. Recently I referred one of my friends to Mr. Sailesh of Knobs Shop who's into the
    business of Hardwares and Door Joiners.
    `
  },
  {
    idx: 3,
    imgage: testinomalImage13,
    name: "Karthikeyan T.    ",
    profession: "MAL BUILDING CENTERING MATERIAL",
    message:`
    Recently I have visited Knob Shop to purchase much needed Lock for my wardrobe. To my
    surprise I was able to purchase desired quantity, Brand of my choice. I wish them great success in all their future Endeavour’s.
    `
  },
  {
    idx: 0,
    imgage: testinomalImage14,
    name: "Nivas S    ",
    profession: "AGAMA ANURAKSATI BUSINESS PROMOTION",
    message:`I have built my dream house on January 2020. All the knobs and glass works were done Sailesh
    and his Knobsshop team.. It is hard to find such a dedicated team that is
    providing service with smile.
    `
  },
  {
    idx: 1,
    imgage: testinomalImage15,
    name: "Bhavesh Mehta",
    profession: "Rishab Investments",
    message:`
    We sincerely thank
    you for the quality services. We would definitely and very strongly continue to refer you to our
    circle of influence. Prompt delivery, fantastic product quality and most
    importantly your very genuine and generous approach definitely stands out.
    
    `
  },
  {
    idx: 2,
    imgage: testinomalImage16,
    name: "Mahesh Prasanna    ",
    profession: "Future Tech Cranes and Hoists Coimbatore    ",
    message:`
    . I really appreciate Mr. Sailesh for the same and assure him that he will be
    getting more and more references from me inside my contact sphere. Mr. Sailesh
    took good efforts and delivered the exact product in a short span of time.
    `
  },
  {
    idx: 3,
    imgage: testinomalImage17,
    name: "Dr.D.Visagamoorthi",
    profession: "Insighters India",
    message:`
    They also expressed that quality of the materials given by them
    were very superior when compared with others. His rates are very competitive. Variety of the
    materials which they possess is innumerable.
    `
  },
  {
    idx: 0,
    imgage: testinomalImage18,
    name: "SANJEEV M",
    profession: "COMFORT HOTELS    ",
    message:`
    . We
    approached Mr. Sailesh of KnobShope for the hand rails. He had suggested us for powder coated
    stainless steel hand railings to suit our interiors.Thank You Mr.
    Sailesh and team KnobShope for the excellent work done.
    `
  },
  {
    idx: 1,
    imgage: testinomalImage19,
    name: "Dr. Kalaivani R.",
    profession: "Wellness Physiotherapy & Fitness Clinic",
    message:`
    I am Dr. Kalaivani, physiotherapist and my husband is a civil engineer who buys hardwares,
    locks , handles for his premium clients . He says that no one can beat the quality of knob shop
    Products
    `
  },
  {
    idx: 2,
    imgage: testinomalImage20,
    name: "K Saravanan",
    profession: "Royal Furnitures",
    message:`
    Thanks for your hospitality extended during our visit to your store, My Client is really happy
    with your product and the service you have provided, The collections of handles and knob was
    excellent with high quality
    `
  },
  {
    idx: 3,
    imgage: testinomalImage21,
    name: "Neeraj Shankla",
    profession: "Neeraj Aromatics Private Limited",
    message:`
    . We
    have been purchasing from Sailesh for all our hardware needs and every time their the am is very
    responsive and also very helpful in guiding us select the right product.
    `
  },
];

const useScrollFadeIn = () => {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasAnimated]);

  return [ref, hasAnimated];
};


function Testimonals() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [fadeClass, setFadeClass] = useState('fade-in');

  const [ref1, visible1] = useScrollFadeIn();
  const [ref2, visible2] = useScrollFadeIn();
  const [ref3, visible3] = useScrollFadeIn();
  const [ref4, visible4] = useScrollFadeIn();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setCurrentIndex(0);
    };

    window.addEventListener('resize', handleResize);

    const interval = setInterval(() => {
      triggerFade(handleNext);
    }, 4000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, [isMobile]);

  const cardsToShow = isMobile ? 1 : 2;

  const triggerFade = (callback) => {
    setFadeClass('fade-out');
    setTimeout(() => {
      callback();
      setFadeClass('fade-in');
    }, 300);
  };

  const handlePrev = () => {
    triggerFade(() => {
      setCurrentIndex((prev) => {
        let newIndex = prev - cardsToShow;
        if (newIndex < 0) {
          newIndex = testimonials.length - cardsToShow;
        }
        return newIndex;
      });
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      let newIndex = prev + cardsToShow;
      if (newIndex >= testimonials.length) {
        newIndex = 0;
      }
      return newIndex;
    });
  };

  const visibleIndexes = [];
  for (let i = 0; i < cardsToShow; i++) {
    visibleIndexes.push((currentIndex + i) % testimonials.length);
  }

  return (
    <>
      <div className='heading-testimonial'>
        <h5>TESTIMONIALS</h5>
      </div>

      <div className='next-prev-icon'>
        <i className="bi bi-chevron-left" onClick={handlePrev}></i>
        <i className="bi bi-chevron-right" onClick={() => triggerFade(handleNext)}></i>
      </div>

      <div className='testimonal-container'>
        <div className='testimonal-left-content'>
          <h1 ref={ref1} className={`scroll-fade ${visible1 ? 'visible' : ''}`}>READ WHAT</h1>
          <h1 ref={ref2} className={`scroll-fade ${visible2 ? 'visible' : ''}`}>OUR CLIENTS THINK</h1>
          <div ref={ref3} className={`scroll-fade ${visible3 ? 'visible' : ''}`} style={{ marginTop: "20px" }}>
            <p>We can already call over 5,000 people our customer, When you are coming</p>
          </div>
          <button ref={ref4} className={`scroll-fade ${visible4 ? 'visible' : ''}`}>DISCOVER NOW</button>
        </div>

        <div className='testimonial-content'>
          <div className={`testimonial-list ${fadeClass}`}>
            {visibleIndexes.map((idx) => {
              const item = testimonials[idx];
              return (
                <div key={item.name + item.profession} className={`testimonial-card card-${item.idx}`}>
                  <img src={item.imgage} className='testimonal-image' alt={item.name} />
                  <p className='testimonial-message'>“{item.message}”</p>
                  <p className='testimonial-name'>{item.name}</p>
                  <p className='testimonial-location'>{item.profession}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Testimonals;
