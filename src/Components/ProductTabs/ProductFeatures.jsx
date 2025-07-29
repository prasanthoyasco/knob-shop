
export default function ProductFeatures({ features = [] }) {
  // Helper to render skeletons when no features are passed
  const renderEmptyState = () => (
    <div className="text-center w-100 py-5 text-muted">
      No features available for this product.
    </div>
  );

  return (
    <div className="container-flued my-4">
      <div className="row g-4">
        {features.length > 0
          ? features.map((item, index) => (
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
            ))
          : renderEmptyState()}
      </div>
    </div>
  );
}
