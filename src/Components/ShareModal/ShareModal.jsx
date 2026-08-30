import React, { useState } from "react";
import { X, Copy, Facebook, Linkedin, Mail } from "lucide-react";
import { FaWhatsapp, FaTwitter } from "react-icons/fa";
import { copyToClipboard } from "../../utils/clipboard";
import "./ShareModal.css";

const ShareModal = ({ open, onClose, link, title = "Share" }) => {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const handleCopy = async () => {
    const success = await copyToClipboard(link);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={24} />,
      color: "#25D366",
      link: `https://wa.me/?text=${encodeURIComponent(title + ": " + link)}`,
    },
    {
      name: "Facebook",
      icon: <Facebook size={24} />,
      color: "#1877F2",
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
    },
    {
      name: "X",
      icon: <FaTwitter size={24} />,
      color: "#000000",
      link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(link)}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={24} />,
      color: "#0A66C2",
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`,
    },
    {
      name: "Email",
      icon: <Mail size={24} />,
      color: "#7F7F7F",
      link: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(link)}`,
    },
  ];

  return (
    <div className="share-modal-overlay" onClick={onClose}>
      <div className="share-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="share-modal-header">
          <h5>{title}</h5>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="share-modal-body">
          <div className="share-options-grid">
            {shareOptions.map((option) => (
              <a
                key={option.name}
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                className="share-option"
              >
                <div className="share-icon-wrapper" style={{ backgroundColor: option.color }}>
                  {option.icon}
                </div>
                <span>{option.name}</span>
              </a>
            ))}
          </div>

          <div className="share-link-section">
            <p className="share-link-label">Page link</p>
            <div className="share-link-input-group">
              <input type="text" readOnly value={link} className="share-link-input" />
              <button className={`copy-link-btn ${copied ? "copied" : ""}`} onClick={handleCopy}>
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
