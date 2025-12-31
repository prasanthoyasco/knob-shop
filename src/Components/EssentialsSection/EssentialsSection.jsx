import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EssentialsSection.css";
import { getEssentials } from "../../API/essentialApi";
import { Subtitles } from "lucide-react";

export default function EssentialsSection() {
  const navigate = useNavigate();
  const [essentials, setEssentials] = useState(null);

  // Fetch from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEssentials(); // returns an array
        if (Array.isArray(data) && data.length > 0) {
          setEssentials(data[0]); // we usually have just one essentials document
        }
      } catch (error) {
        console.error("Failed to load essentials:", error);
      }
    };
    fetchData();
  }, []);
  const rowsData = [
  [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
      header: "Modern Design",
      para: "Sleek and stylish",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      header: "Classic Touch",
      para: "Timeless looks",
    },
  ],
  [
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800",
      header: "Luxury Theme",
      para: "Elegant finishes",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
      header: "Modern Living",
      para: "Bold and modern city feel",
    },
  ],
  [
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
      header: "Urban Vibes",
      para: "Bold and modern city feel",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
      header: "Modern Living",
      para: "Bold and modern city feel",
    },
  ],
];

function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
  if (!essentials) return null; // or add a loader/spinner

  return (
    <section className="p-5 bg-light essentials-bg-img d-flex align-items-center justify-content-center">
      <div className="d-flex align-items-center flex-column">
        <div className="container-fluid mx-md-4 px-0 d-flex align-items-center flex-wrap w-100 overflow-hidden">
          <div className="row d-flex align-items-center">
            {/* Heading & Description */}
            <div className="mb-4 col-3">
              <h2
                className="h4 fw-semibold text-dark"
                data-aos="fade-right"
                data-aos-delay="100"
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "1rem",
                  lineHeight: "3.4rem",
                }}
              >
                {essentials.mainHeading}
              </h2>
              <p
                className="text-muted"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                {essentials.mainDescription}
              </p>
            </div>

            {/* Cards */}
            <div className="box-number col-12 col-lg-8 d-flex gap-3 justify-content-start flex-wrap flex-md-nowrap">
              {essentials.cards.slice(0, 3).map((card, index) => (
                <div
                  key={card._id || index}
                  className="mb-4"
                  style={{ minWidth: "250px", maxWidth: "300px", width:"100%" }}
                  data-aos="fade-up"
                  data-aos-delay={100 * (index + 1)}
                  onClick={() =>
                    navigate("/essentials-details", {
                      state: {
                        title: card.title,
                        Subtitles: "essentials",
                        category: card.categories,
                        rowsData: chunkArray(essentials.cards, 2),
                      },
                    })
                  }
                >
                  <div
                    className="card essential-card text-start h-100 w-100"
                    style={{ "--bg-image": `url(${card.bgImage})` }}
                  >
                    <div className="card-body position-relative z-1">
                      <div className="d-flex flex-column">
                        <div className="my-2">
                          <h1 className="display-1 fw-bold stroke-text my-4">
                            {card.number}
                          </h1>
                        </div>
                        <div className="mt-5 d-flex flex-column gap-2 w-fit">
                          <h5 className="h2 card-title fw-semibold text">
                            {card.title}
                          </h5>
                          <p className="card-text small text">
                            {card.description}
                          </p>
                          <a
                            href=""
                            onClick={() =>
                              navigate("/essentials-details", {
                                state: {
                                  title: card.title,
                                  Subtitles: "essentials",
                                  category: card.categories,
                                  rowsData: chunkArray(essentials.cards, 2),
                                },
                              })
                            }
                            className="text-decoration-underline text fw-medium small"
                          >
                            Read More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All Products button */}
        <div className="text-center mt-4">
          <button
            className="dark-btn rounded-pill px-4 py-2"
            onClick={() =>
              navigate("/essentials-details", {
                state: {
                  rowsData: chunkArray(essentials.cards, 2),  
                  Subtitles: "essentials",
                  title: "All Products",
                },
              })
            }
          >
            Check All Essentials
          </button>
        </div>
      </div>
    </section>
  );
}
