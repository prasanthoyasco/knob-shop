import React from 'react'
const htmlContent = `

<div class="section">
<h1>Damaged, Missing, or Wrong Items</h1>
<p>If your package arrives:</p>
<ul>
  <li>Damaged</li>
  <li>With missing items</li>
  <li>With incorrect products</li>
</ul>
<p>Please report to us within 24 hours of delivery with:</p>
<ul>
  <li>Clear images/videos of the packaging and product</li>
  <li>Order number and delivery receipt</li>
</ul>
</div>

<div class="section">
<h2>41) Resolution:</h2>
<p><span class="highlight">Reverse pickup</span> will be arranged if needed</p>

<h3>Missing Items in Your Order</h3>
<ul>
  <li>Recheck the packaging thoroughly—small parts may be packed inside other boxes</li>
  <li>If still missing, contact us within 24 hours</li>
  <li>Share the order ID and unboxing video & photo</li>
</ul>
<div class="note">
  <i class="bi bi-box-seam"></i> <strong>Resolution:</strong><br>
  We will verify with our warehouse team<br>
  Missing items will be shipped immediately or refunded as per your choice
</div>

<h3><i class="bi bi-exclamation-triangle-fill"></i> Received the Wrong Product</h3>
<p>If you receive a product that is not what you ordered (e.g., wrong size, model, or color):</p>
<p><i class="bi bi-check-circle-fill"></i> <strong>What to Do:</strong></p>
<ul>
  <li>Take a photo & video of the wrong item and your order invoice</li>
  <li>Contact our support team within 48 hours</li>
</ul>
<div class="note">
  <i class="bi bi-box-seam"></i> <strong>Resolution:</strong><br>
  We will arrange for free reverse pickup<br>
  Send you the correct item at no additional charge
</div>
</div>

<div class="section">
<h3><i class="bi bi-exclamation-circle-fill"></i> Important Notes</h3>
<ul>
  <li>Claims beyond 48 hours of delivery may not be eligible for free return/replacement</li>
  <li>Products must be unused and in original packaging for returns</li>
  <li>Ensure unboxing video if you suspect package tampering</li>
</ul>
</div>

<div class="contact">
<h3><i class="bi bi-telephone-fill"></i> Customer Support</h3>
<p>For all such issues, reach us quickly:</p>
<ul>
  <li><i class="bi bi-envelope-fill"></i> Email: <a href="mailto:ecom@knobsshop.store">ecom@knobsshop.store</a></li>
  <li><i class="bi bi-telephone-fill"></i> Phone/WhatsApp: <a href="tel:7092466600">70924 66600</a></li>
  <li><i class="bi bi-clock-fill"></i> Support Hours: 24/7 Support</li>
</ul>
</div>
`
function Damage() {
  return (
    <div
        className='terms-and-condition-container'
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
  )
}

export default Damage
