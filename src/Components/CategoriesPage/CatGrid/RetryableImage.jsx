import React, {useState } from "react";

export function RetryableImage({ src, alt, className }) {
  const [currentSrc, setCurrentSrc] = useState(src?.trim() || "/fallback.png");
  const [hasRetried, setHasRetried] = useState(false);

  const handleError = () => {
    if (!hasRetried && src) {
      setHasRetried(true);
      setCurrentSrc(src.trim()); 
    } else {
      setCurrentSrc("/fallback.png");
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
