import React from "react";

const ProductSpecificationTable = ({ specifications = [], loading = false }) => {
  const renderSkeletonRow = (key) => (
    <div className="d-flex flex-column flex-md-row" key={key}>
      <div className="p-4 w-50 w-sm-100 d-flex border-end border-bottom align-items-center">
        <div className="w-50 bg-light rounded" style={{ height: "20px", width: "90%" }}></div>
        <div className="w-50 bg-light rounded ms-2" style={{ height: "20px", width: "80%" }}></div>
      </div>
      <div className="p-4 w-50 w-sm-100 d-flex border-bottom align-items-center">
        <div className="w-50 bg-light rounded" style={{ height: "20px", width: "90%" }}></div>
        <div className="w-50 bg-light rounded ms-2" style={{ height: "20px", width: "80%" }}></div>
      </div>
    </div>
  );

  return (
    <div className="border">
      {loading
        ? Array.from({ length: 4 }).map((_, i) => renderSkeletonRow(i))
        : specifications.reduce((rows, spec, i) => {
            if (i % 2 === 0) {
              const next = specifications[i + 1];
              rows.push(
                <div className="d-flex flex-column flex-md-row" key={i}>
                  <div className="p-4 w-50 w-sm-100 d-flex border-end border-bottom align-items-center">
                    <div className="w-50 fs-large"><strong style={{ textTransform: "capitalize" }}>{spec.title || spec.label}:</strong></div>
                    <div className="w-50">{spec.value}</div>
                  </div>
                  {next ? (
                    <div className="p-4 w-50 w-sm-100 d-flex border-bottom align-items-center">
                      <div className="w-50 fs-large"><strong style={{ textTransform: "capitalize" }}>{next.title || next.label}:</strong></div>
                      <div className="w-50">{next.value}</div>
                    </div>
                  ) : (
                    <div className="p-2 flex-fill"></div>
                  )}
                </div>
              );
            }
            return rows;
          }, [])}
    </div>
  );
};

export default ProductSpecificationTable;
