import React from "react";
import { Download, Info } from "lucide-react";
import "./Tracking.css";

export const Tracking = ({ trackingData, loading }) => {
  if (loading) return <p>Fetching tracking info...</p>;
  if (!trackingData) return <p>No tracking info available</p>;

  const { trackHeader, trackDetails } = trackingData;
  const progressPercent = Math.min((trackDetails.length / 5) * 100, 100); // Simple progress

  // Time formatting helpers
  const formatDTDCTime = (time) => {
    if (!time || time.length < 3) return time;
    let hours = parseInt(time.slice(0, 2), 10);
    const minutes = time.slice(2, 4);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    return `${hours}:${minutes} ${ampm}`;
  };

  const formatDTDCDateTime = (date, time) => {
    if (!date || date.length !== 8) return time || date;
    const day = date.slice(0, 2);
    const month = date.slice(2, 4);
    const year = date.slice(4, 8);
    return `${day}-${month}-${year} ${formatDTDCTime(time)}`;
  };

  return (
    <div className="container-flued order-tracking my-4 my-md-5 p-1 p-md-4 bg-white">
      {/* Header */}
      <div className="row justify-content-between align-items-center mb-3">
        <div className="col-md-8 p-0">
          <h5 className="fw-semibold order-head">ORDER DETAILS</h5>
        </div>
        <div className="col-md-4 text-end">
          <a href="#" className="download-invoice">
            <Download color="#111" size={16} />
            <span className="mx-2">Download Invoice</span>
          </a>
        </div>
      </div>

      {/* Shipment Info */}
      <div className="row my-3 my-md-5 px-0 px-md-3 border-top-bottom py-4 gy-3">
        {[
          { label: "Order Number", value: trackHeader.strShipmentNo },
          { label: "Status", value: trackHeader.strStatus },
          { label: "Origin", value: trackHeader.strOrigin },
          { label: "Destination", value: trackHeader.strDestination },
          { label: "Booked Date", value: trackHeader.strBookedDate },
          { label: "Pieces", value: trackHeader.strPieces },
          { label: "Weight", value: trackHeader.strWeight },
        ].map((item, idx) => (
          <div key={idx} className="col-12 col-md d-flex flex-row flex-md-column align-items-center justify-content-around gap-3">
            <div className="w-50 w-md-100"><p className="text-muted m-0">{item.label}</p></div>
            <div className="w-50 w-md-100 ps-2 ps-md-0"><span className="fs-7 fw-medium">{item.value || "-"}</span></div>
          </div>
        ))}
      </div>

      {/* Tracking Steps */}
      <div className="tracking-steps-wrapper position-relative">
        <div className="order-progress-container">
          <div className="progress-line">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="progress-steps mx-2">
            {trackDetails.map((step, idx) => (
              <div key={idx} className={`circle ${step.strAction === "Delivered" ? "completed" : "current"}`}></div>
            ))}
          </div>
        </div>

        <div className="d-flex justify-content-between text-center tracking-steps">
          {trackDetails.map((step, idx) => (
            <div key={idx} className={`step ${step.strAction === "Delivered" ? "completed" : "current"}`} style={{ position: "relative" }}>
              <div className={`icon ${step.strAction.toLowerCase().replace(/\s/g, "-")}`} />
              <div className="label">{step.strAction}</div>
              <div className="date">{formatDTDCDateTime(step.strActionDate, step.strActionTime)}</div>

              {/* Info icon */}
              <div className="step-info-icon" style={{ marginTop: "5px", cursor: "pointer" }}>
                <Info size={16} color="#3182ce" />
                <div className="step-info-tooltip">
                  <p><strong>Origin:</strong> {step.strOrigin || "-"}</p>
                  <p><strong>Destination:</strong> {step.strDestination || "-"}</p>
                  <p><strong>Manifest No:</strong> {step.strManifestNo || "-"}</p>
                  {step.sTrRemarks && <p><strong>Remarks:</strong> {step.sTrRemarks}</p>}
                  {step.strLatitude && step.strLongitude && (
                    <p><strong>Location:</strong> {step.strLatitude}, {step.strLongitude}</p>
                  )}
                  {step.strNDCOTP && <p><strong>OTP:</strong> {step.strNDCOTP}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
