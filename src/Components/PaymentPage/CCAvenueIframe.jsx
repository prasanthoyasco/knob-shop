import React, { useEffect, useRef } from "react";

export default function CCAvenueIframe({ encRequest, accessCode }) {
  const formRef = useRef();

  useEffect(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, [encRequest, accessCode]);

  return (
    <>
      <form
        ref={formRef}
        method="POST"
        action={`https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction`}
        target="paymentFrame"
        style={{ display: "none" }}
      >
        <input type="hidden" name="encRequest" value={encRequest} />
        <input type="hidden" name="access_code" value={accessCode} />
      </form>
      <iframe
        name="paymentFrame"
        width="100%"
        height="600px"
        frameBorder="0"
        title="CCAvenue Payment"
      />
    </>
  );
}
