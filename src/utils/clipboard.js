export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      throw new Error("Clipboard API unavailable");
    }
  } catch (err) {
    // Reliable fallback for older browsers and iOS Safari constraints
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Prevent scrolling to bottom
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    } catch (copyErr) {
      console.error("Fallback copy error:", copyErr);
      document.body.removeChild(textArea);
      return false;
    }
  }
};
