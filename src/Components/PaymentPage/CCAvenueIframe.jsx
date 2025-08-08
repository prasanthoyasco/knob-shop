import React, { useEffect } from "react";

const CCAvenueIframe = ({ encRequest, accessCode, merchantId}) => {
  console.log(merchantId);
  
  const iframeUrl = `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${merchantId}&encRequest=${encRequest}&access_code=${accessCode}`;

  useEffect(() => {
    const handler = (e) => {
      console.log("Message from CCAvenue:", e.data);
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <>
      <iframe
        id="paymentFrame"
        src={iframeUrl}
        width="100%"
        height="600px"
        frameBorder="0"
        scrolling="No"
        style={{ border: "none" }}
        title="CCAvenue Payment"
      />
    </>
  );
};

export default CCAvenueIframe;
