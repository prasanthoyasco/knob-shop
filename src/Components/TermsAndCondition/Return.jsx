import React from 'react'
import NavbarTop from '../Navbar/NavbarTop/NavbarTop'
import Footer from '../Footer/Footer'
const htmlContent = `
<h1>Return Policy</h1>

<h2>1) Order Cancellation</h2>
<ul>
  <li>YYou can cancel your order before it is invoiced by emailing ecom@knobsshop.store
  with your order number and date. </li>
  <li>Once shipped, orders cannot be canceled.</li>
  <li>Refunds (for cancelled orders only) will be processed within 7 business days to the
  original payment method. Please consult your bank for further details. </li>
</ul>

<h2>2) Non-Returnable Items</h2>
<p>We cannot accept returns for:</p>
<ul>
  <li>Customized or personalized products</li>
  <li>Sale items or gift cards offers.</li>
</ul>

<h2>3) Returns & Exchanges</h2>
<ul>
  <li>If you received a defective item, contact <strong>ecom@knobsshop.store</strong> within 2 days with photos, your order number, and invoice.</li>
  <li>No returns or refunds unless the product is transit damaged, defective due to manufacturing and incorrect shipment</li>
  <li>If verified, we will arrange a replacement of the same product.</li>
  <li>Refunds are provided only when the replacement is not possible.</li>
  <li>Products must be unused and returned in original packaging.</li>
  <li>If we ask you to return the product yourself, shipping fees may be reimbursed.</li>
  <li>Proof of purchase (like tax invoice or order number) is required.</li>
  <li>All tags, barcodes, accessories, shipping, labels, invoices, etc.., must be returned intact.</li>
  <li>We do not offer refunds for size-related issues. All dimensions are mentioned on the website—please review them before ordering.</li>
  <li>If the issue is determined to be due to customer error, no replacement will be issued, and the original product will be returned to you.</li>
</ul>

<h2>4) Refused/Undelivered Orders</h2>
<p>If your order is returned due to refusal or unavailability: Refunds will be processed after deducting the shipping cost, return shipping, and a restocking fee.</p>

<h2>5) Quality Check</h2>
<p>Returned items will be inspected by our team. If your claim is valid, we will send a replacement. If the issue is not due to our error, the same product will be returned to you.</p>

<h2>6) Transit Damage</h2>
<ul>
  <li>If your product is damaged during transit delivery, replacements are at knobs shop discretion.</li>
  <li>Details with photoshoot sent within 2 days of receiving the order.</li>
</ul>
`
function Return() {
  return (
    <>
    <NavbarTop/>
    <div
        className='terms-and-condition-container'
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <Footer/>
      </>
  )
}

export default Return
