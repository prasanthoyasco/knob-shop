import { useState, useRef, useEffect } from "react";

const SortDropdown = ({ onChange }) => {
  const [selected, setSelected] = useState("Best selling");
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

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

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="position-relative d-inline-block" ref={dropdownRef}>
      <button
        onClick={() => setShow(!show)}
        className="btn btn-link text-decoration-none dropdown-toggle px-1 hover:bg-light"
        style={{ border: "0px !important",color:"#000" }}
      >
        {selected}
      </button>

      {show && (
        <div
          className="dropdown-menu show mt-2"
          style={{
            display: "block",
            minWidth: "200px",
            top: "40px",
            right: 0,
            border: "0 !important",
            position: "absolute",
            zIndex: 1000,
          }}
        >
          {options.map((option) => (
            <button
              key={option}
              className={`dropdown-item my-1 py-2 d-flex justify-content-between align-items-center ${
                option === selected ? "active" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              <span>{option}</span>
              {option === selected && (
                <span
                  className="ms-2"
                  style={{ width: "21px", height: "21px", display: "inline-block" }}
                  dangerouslySetInnerHTML={{
                    __html: `
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_1457_852" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                      <rect x="0.5" y="0.420593" width="25" height="25" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_1457_852)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4804 8.61331C14.599 8.74492 14.5964 8.95596 14.4747 9.08468L9.48789 14.3584C9.36617 14.4872 9.17136 14.4848 9.05278 14.3532L6.62348 11.6571C6.50489 11.5256 6.50743 11.3145 6.62915 11.1858C6.75086 11.057 6.94567 11.0594 7.06426 11.191L9.27883 13.6488L14.0453 8.60808C14.167 8.47936 14.3618 8.4817 14.4804 8.61331Z" fill="#e18436"/>
                    </g>
                    </svg>`,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
