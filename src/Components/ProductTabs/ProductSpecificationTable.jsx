import React from "react";

const specifications = [
  { label: "Door Thickness (mm)", value: "35–65" },
  { label: "RFID Card", value: "Yes" },
  { label: "Fingerprint", value: "Yes, upto 100" },
  { label: "Body Color", value: "Brown" },
  { label: "Integration with VDP", value: "No" },
  { label: "Emergency Access", value: "USB port available for power bank" },
  { label: "Manual Key", value: "2 nos." },
  { label: "Model Type", value: "Mortise" },
  { label: "PIN", value: "Yes, upto 100 users" },
];

const ProductSpecificationTable = () => {
  return (
    <div className="border">
      {specifications.reduce((rows, spec, i) => {
        if (i % 2 === 0) {
          const next = specifications[i + 1];
          rows.push(
            <div className="d-flex flex-column flex-md-row " key={i}>
              <div className="p-4 w-50 w-sm-100 d-flex border-end border-bottom align-items-center">
                <div className="w-50 fs-large"><strong>{spec.label}:</strong></div>
                <div className="w-50">{spec.value}</div>
              </div>
              {next ? (
                <div className="p-4 w-50 w-sm-100 d-flex border-bottom align-items-center">
                  <div className="w-50 fs-large"><strong>{next.label}</strong></div>
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
