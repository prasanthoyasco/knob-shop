// LoginPromptModal.jsx
import React from "react";
// Don't forget to import your custom CSS file if you have one
import './LoginPromptModal.css'; // Assuming you create this file for custom styles

const LoginPromptModal = ({ open, onClose, onLogin }) => {
  if (!open) return null;

  return (
    // Modal Backdrop: fixed, translucent background, centered content
    <div className="modal-backdrop-custom d-flex justify-content-center align-items-center">
      {/* Modal Dialog */}
      <div className="modal-dialog-centered"> {/* Bootstrap class to center vertically */}
        <div className="modal-content custom-modal-content text-center">
          {/* Modal Header (optional, but good for structure) */}
          <div className="modal-header d-flex justify-content-center border-0 pb-2">
            <h5 className="modal-title fw-semibold">Login Required</h5>
            {/* If you wanted a close button (X icon) in the header: */}
            {/* <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button> */}
          </div>

          {/* Modal Body */}
          <div className="modal-body py-4">
            <p className="text-secondary">
              Please log in to complete your purchase.
            </p>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer d-flex justify-content-center border-0 pt-3">
            <button
              type="button"
              style={{width:'40%'}}
              className="btn btn-secondary m-1" // Bootstrap secondary button
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              style={{width:'40%'}}
              className="btn  m-1 custom-login-btn" // Custom class for your brand color
              onClick={onLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptModal;