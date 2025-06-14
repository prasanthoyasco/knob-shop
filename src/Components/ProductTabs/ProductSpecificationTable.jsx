

const specifications = [
  { label: "Door Thickness (mm)", value: "35–65" },
  { label: "RFID Card", value: "Yes" },
  { label: "Fingerprint", value: "Yes, up to 100" },
  { label: "Body Color", value: "Brown" },
  { label: "Integration with VDP", value: "No" },
  { label: "Emergency Access", value: "USB port available for power bank" },
  { label: "Manual Key", value: "2 nos." },
  { label: "Model Type", value: "Mortise" },
  { label: "PIN", value: "Yes, up to 100 users" },
];

const ProductSpecificationTable = () => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered mb-0">
        <tbody>
          {specifications.reduce((rows, spec, index) => {
            if (index % 2 === 0) {
              const nextSpec = specifications[index + 1];
              rows.push(
                <tr key={index}>
                  <td style={{ width: "50%" }}>
                    <strong>{spec.label}</strong><br />
                    {spec.value}
                  </td>
                  {nextSpec ? (
                    <td style={{ width: "50%" }}>
                      <strong>{nextSpec.label}</strong><br />
                      {nextSpec.value}
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              );
            }
            return rows;
          }, [])}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSpecificationTable;
