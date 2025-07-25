import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../API/productApi";

export default function ProductFeatures() {
  const { id } = useParams();
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductFeatures() {
      try {
        const product = await getProductById(id);
        setFeatures(product.features || []);
      } catch (error) {
        console.error("Failed to fetch product features", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductFeatures();
  }, [id]);

  // Helper to render skeleton cards
  const renderSkeletons = (count = 6) => {
    return Array.from({ length: count }).map((_, index) => (
      <div className="col-md-4 col-sm-6" key={index}>
        <div className="p-3 h-100 d-flex flex-column align-items-center justify-content-start bg-white">
          <div
            className="mb-2 border overflow-hidden bg-gray-800"
            style={{
              minWidth: 250,
              maxWidth: "312px",
              height: "200px",
              borderRadius: "10px",
            }}
          ></div>
          <div style={{ minWidth: 250, maxWidth: 300 }} className="w-100">
            <div className="bg-gray-800 rounded mb-2" style={{ height: "20px", width: "80%" }}></div>
            <div className="bg-gray-800 rounded" style={{ height: "12px", width: "100%" }}></div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container-flued my-4">
      <div className="row g-4">
        {loading
          ? renderSkeletons()
          : features.map((item, index) => (
              <div className="col-md-4 col-sm-6" key={index}>
                <div className="p-3 h-100 text-center d-flex flex-column align-items-center justify-content-start bg-white">
                  <div
                    className="mb-4 border overflow-hidden"
                    style={{
                      minWidth: 250,
                      maxWidth: "312px",
                      maxHeight: "312px",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-100 h-100 mb-3"
                      style={{ objectFit: "fill" }}
                    />
                  </div>
                  <div style={{ minWidth: 250, maxWidth: 300 }} className="text-start">
                    <h6 className="fw-bold">{item.title}</h6>
                    <p className="text-muted small">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
