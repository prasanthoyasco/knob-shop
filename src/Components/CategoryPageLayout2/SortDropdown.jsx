import { useState } from "react";

const SortDropdown = ({ onChange }) => {
  const [selected, setSelected] = useState("Best selling");
  const [show, setShow] = useState(false);

  const options = [
    "Best selling",
    "Alphabetically, A–Z",
    "Alphabetically, Z–A",
    "Price, low to high",
    "Price, high to low",
    "Date, old to new",
    "Date, new to old",
  ];

  const handleSelect = (option) => {
    setSelected(option);
    setShow(false);
    onChange(option);
  };

  return (
    <div className="position-relative d-inline-block">
      <button
        onClick={() => setShow(!show)}
        className="btn btn-light btn-sm dropdown-toggle px-3 hover:bg-light"
        style={{ border: "0px solid #ccc" }}
      >
        {selected}
      </button>

      {show && (
        <div
          className="dropdown-menu show mt-2 shadow-sm"
          style={{
            display: "block",
            minWidth: "200px",
            right:0,
            position: "absolute",
            zIndex: 1000,
          }}
        >
          {options.map((option) => (
            <button
              key={option}
              className={`dropdown-item ${
                option === selected ? "active" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
