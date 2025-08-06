import React from 'react';
import effortless from '../../Assets/Front Page Doc and Images/Front Page Doc and Images/sec - 5 &7/sec - 5 &7/limocoat/1bf068f1d2506ec7d88816558edc77a1.jpg';
import kitchen from '../../Assets/Front Page Doc and Images/Front Page Doc and Images/sec - 5 &7/sec - 5 &7/Colortek/127f7890019a8da809712fe43661bd11.jpg';
import shelves from '../../Assets/EssentialsSection/shelves.jpg';
import './EssentialsSection.css'; // We'll write styles here
import { useNavigate } from 'react-router-dom';

const cards = [
  {
    number: '01',
    title: 'Living Room ',
    description: 'Stylish space for relaxing, entertaining, and gatherings.',
    bgImage: effortless,
    category:[
      {image:effortless, catgoryName : "Sofas & Sectionals"},
      {image:effortless, catgoryName : "Coffee Tables"},
      {image:effortless, catgoryName : "TV Units / Entertainment Units"},
      {image:effortless, catgoryName : "Wall Shelves"},
      {image:effortless, catgoryName : "Living Room Décor"},
    ]
  },
  {
    number: '02',
    title: 'Bedroom',
    description: 'Comfortable retreat designed for rest and privacy.',
    bgImage: kitchen,
    category:[
      {image:kitchen, catgoryName : "Wardrobes"},
      {image:kitchen, catgoryName : "Bedside Tables"},
      {image:kitchen, catgoryName : "Dressing Tables"},
      {image:kitchen, catgoryName : "Bedroom Sets"},
      {image:kitchen, catgoryName : "Mirrors"},
    ]
  },
  {
    number: '03',
    title: 'Kitchen',
    description: 'Functional area for cooking, dining, and storage.',
    bgImage: shelves,
    category:[
      {image:shelves, catgoryName : "Modular Kitchen Units"},
      {image:shelves, catgoryName : "Cabinets & Shutters"},
      {image:shelves, catgoryName : "Kitchen Accessories "},
      {image:shelves, catgoryName : "Pantry Units "},
    ]
  },
];

export default function EssentialsSection() {
  const navigate = useNavigate()
  return (
    <section className="p-5 bg-light essentials-bg-img d-flex align-items-center justify-content-center">
      <div className="d-flex align-items-center flex-column">
        <div className="container-fluid mx-md-4 px-0 d-flex align-items-center flex-wrap w-100 overflow-hidden">
             <div className="row d-flex align-items-center">
        <div className="mb-4 col-3 ">
          <h2 className="h4 fw-semibold text-dark" data-aos="fade-right"  data-aos-delay='100' style={{fontSize:'2.5rem',marginBottom:'1rem',lineHeight:'3.4rem'}}>Essential Details, Elevated Living</h2>
          <p className="text-muted" data-aos="fade-right"  data-aos-delay='200'>Discover modern hardware, décor, and utility solutions that bring style and function into perfect balance. From smooth drawer systems to space-saving kitchen essentials, our curated collection is built to elevate your everyday living experience — effortlessly, elegantly, and intelligently.</p>
        </div>

       <div className="box-number col-12 col-lg-8 d-flex gap-3 justify-content-start flex-wrap flex-md-nowrap">
          {cards.map((card, index) => (
            <div key={index} className="mb-4" style={{minWidth:'250px',maxWidth:'300px'}} data-aos="fade-up"
          data-aos-delay={100 * (index+1)}
          onClick={() => navigate('/categories', { state: { title: card.title, category: card.category } })}
          >
              <div
                className="card essential-card text-start h-100 w-100"
                style={{ '--bg-image': `url(${card.bgImage})` }}
              >
                <div className="card-body position-relative z-1">
                 <div className='d-flex flex-column'>
                     <div className='my-2'><h1 className="display-1 fw-bold stroke-text my-4">{card.number}</h1></div>
                  <div className='mt-5 d-flex flex-column gap-2 w-fit'><h5 className="h2 card-title fw-semibold text">{card.title}</h5>
                  <p className="card-text small text">{card.description}</p>
                  <a href="/categories" className="text-decoration-underline text fw-medium small">Read More</a></div>
                 </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
      
      <div className="text-center mt-4">
          <button className="dark-btn rounded-pill px-4 py-2" 
onClick={() =>
  navigate("/categories", {
    AllProductstate: {
      title: "All Products",
      cards
    },
  })
}

          >
            CHECK ALL PRODUCTS
          </button>
        </div>
      </div>
    </section>
  );
}
