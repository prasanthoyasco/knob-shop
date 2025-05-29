import React from 'react';
import effortless from '../../Assets/EssentialsSection/effortless.jpg';
import kitchen from '../../Assets/EssentialsSection/kitchen.jpg';
import shelves from '../../Assets/EssentialsSection/shelves.jpg';
import './EssentialsSection.css'; // We'll write styles here

const cards = [
  {
    number: '01',
    title: 'Effortless Motion',
    description: 'Reliable movement for every cabinet and drawer.',
    bgImage: effortless,
  },
  {
    number: '02',
    title: 'Kitchen Accessories',
    description: 'Smart tools, seamless routines.',
    bgImage: kitchen,
  },
  {
    number: '03',
    title: 'Kitchen Wall Shelves',
    description: 'Smart space, sleek design.',
    bgImage: shelves,
  },
];

export default function EssentialsSection() {
  return (
    <section className="p-5 bg-light essentials-bg-img d-flex align-items-center justify-content-center">
      <div className="d-flex align-items-center flex-column">
        <div className="container-fluid mx-md-4 px-0 d-flex align-items-center flex-wrap w-100 overflow-hidden">
             <div className="row d-flex align-items-center">
        <div className="mb-4 col-3 ">
          <h2 className="h4 fw-semibold text-dark">Essential Details, Elevated Living</h2>
          <p className="text-muted">Hardware, décor & utility pieces designed to perfect every space.</p>
        </div>

       <div className="col-8 d-flex gap-3 justify-content-start">
          {cards.map((card, index) => (
            <div key={index} className="mb-4" style={{minWidth:'250px',maxWidth:'300px'}}>
              <div
                className="card essential-card text-start h-100 w-100"
                style={{ '--bg-image': `url(${card.bgImage})` }}
              >
                <div className="card-body position-relative z-1">
                 <div className='d-flex flex-column'>
                     <div className='my-2'><h1 className="display-1 fw-bold stroke-text my-4">{card.number}</h1></div>
                  <div className='mt-5 d-flex flex-column gap-2 w-fit'><h5 className="h2 card-title fw-semibold text">{card.title}</h5>
                  <p className="card-text small text">{card.description}</p>
                  <a href="#" className="text-decoration-underline text fw-medium small">Read More</a></div>
                 </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
      
      <div className="text-center mt-4">
          <button className="dark-btn rounded-pill px-4 py-2">
            CHECK ALL PRODUCTS
          </button>
        </div>
      </div>
    </section>
  );
}
