import React from 'react'
import NavbarTop from '../Navbar/NavbarTop/NavbarTop'
import Footer from '../Footer/Footer'
const htmlContent = `
<h1>Warranty Claims Policy</h1>

<h3>a) Warranty Overview</h3>
<p>
    We support warranty claims for eligible hardware products in accordance with the
    manufacturer’s warranty or seller’s stated policy. Warranty coverage varies by product and
    brand.
</p>

<h3>b) Warranty Eligibility</h3>
<p>A product may be eligible for a warranty claim if,</p>
<ul>
    <li>i) It has a manufacturing defect.</li>
    <li>ii) Its malefactions under normal use within the warranty period.</li>
    <li>iii) Product was purchased directly through Knobsshop or Knobsshopstore.</li>
    <li>iv) Proof of purchase (invoice or order ID) is provided.</li>
</ul>
<p>a) Malfunctions caused by using the product in damp environment without water resistant protections.</p>
<p>iv) Incorrect Claims or Misuse of Policy</p>
<ul>
    <li>b) Products returned with intentional damage.</li>
    <li>c) Repeated invalid claims or abuse of warranty services.</li>
</ul>

<p><strong>Note:</strong><br>
    Each claim will be inspected and validated by our technical team and manufacturer. If
    the cause of the defect falls under the above exclusion, the claim will be rejected. In such
    cases, you may offered paid repair or replacement options available.
</p>

<h3>c) Third Party Seller Products</h3>
<p>If a product was sold by a third - party seller:</p>
<ul>
    <li>i) The seller is responsible for honoring warranty.</li>
    <li>ii) Knobsshop can assist with communication and process monitoring but it cannot
    ensure a resolution unless it fulfills the items.</li>
</ul>

<h3>d) Abuse of Warranty Claims</h3>
<p>To protect against fraud, we reserve the right to deny warranty claims if:</p>
<ul>
    <li>i) The claim is repeated or unreasonable.</li>
    <li>ii) The product is returned in a different or altered state.</li>
    <li>iii) The claim is submitted with false information or documents.</li>
    <li>iv) The user has a history ofsuspicious or abusive behavior.</li>
</ul>
<p>We may suspend or terminate accounts found in violation of this policy.</p>

<h2>4) Claim Process</h2>
<p>
    We are committed to delivering quality hardware products and ensuring your satisfaction. If you
    experience an issue with a product covered under warrenty, please follow the steps below to
    submit a claim.
</p>

<h3>a) Warranty Period</h3>
<ul>
    <li>i) The warranty period begins from the date of invoice.</li>
    <li>ii) Claims made after the warranty period has expired are not eligible for service,
    repair, replacement or refund under warranty terms.</li>
</ul>

<h3>b) What’s Covered</h3>
<ul>
    <li>a. Manufacturing defects.</li>
    <li>b. Malfunctions not caused by user error.</li>
    <li>c. Missing internal parts that prevent functionality.</li>
    <li>d. Product stops working within the warranty period despite correct usage</li>
    <li>e. Parts fail without user misuse or external damage.</li>
    <li>f. Only valid if such parts are explicitly included under the product warranty.</li>
</ul>

<h3>c) What’s not covered</h3>
<h4>i) Physical Damage</h4>
<ul>
    <li>a) Broken or cracked parts due to drops, impact or mishandling.</li>
    <li>b) Scratches, dents, scuffs or other cosmetic damage.</li>
    <li>c) Damages caused during transport not reported immediately upon delivery.</li>
</ul>

<h4>ii) Unauthorised Modifications or Repairs</h4>
<ul>
    <li>a) Alterations of any internal or external components.</li>
    <li>b) Use of Non genuine spare parts.</li>
    <li>c) Repairs performed by unauthorised service centres or individuals.</li>
</ul>

<h4>iii) Water or Heat Damage</h4>
<ul>
    <li>d) Damage caused by moisture, water exposure or immersion.</li>
    <li>e) Corrosion, rusting or short circuiting due to humidity or water ingress.</li>
</ul>

<p>
    After evaluation we will proceed with one of the following resolutions based on warranty
    coverage:
</p>
<ul>
    <li>a. Replacement of the same or equivalent item.</li>
    <li>b. Repair at no cost (where applicable).</li>
    <li>c. Refund (full or partial)</li>
    <li>d. The final resolution depends on product availability, defect severity and
    warranty terms.</li>
</ul>

<h3>d) Claim Closure</h3>
<ul>
    <li>i) A confirmation email will be sent summarizing the outcome.</li>
    <li>ii) Your claim ticket will be officially closed.</li>
    <li>iii) You may be invited to leave feedback about your experience.</li>
</ul>

<h4>Important Notes</h4>
<ul>
    <li>i) Claims submitted after the warranty period will not be accepted.</li>
    <li>ii) Claims involving physical damage, misuse or unauthorized repairs are not covered.</li>
    <li>iv) Repeated or abusive claims may be result in denial of warranty service or
    account suspension.</li>
</ul>

<h1>Pricing and availability</h1>
<p>
  We list availability information for products sold by us on the website, including on each
  product information page. Beyond what we say on that page or otherwise on the website, we
  cannot be more specific about availability. Please note that dispatch estimates are just that.
  They are not guaranteed dispatch times and should not be relied upon as such. As we process
  your order, you will be informed by e-mail if any products you order turn out to be unavailable.
  All prices are inclusive of VAT/CST, service tax, Goods and Services Tax ("GST"), duties
  and cesses as applicable - unless stated otherwise.
</p>

<h3>a) Verify Warranty Eligibility</h3>
<p>Before initiating a claim, please ensure the following:</p>
<ul>
  <li>The product is within the valid warranty period (based on the invoice Date or delivery date).</li>
  <li>The issue is covered under warranty (manufacturing defect or functional failure).</li>
  <li>The item has not been misused, modified or physically damaged.</li>
</ul>

<h3>b) Prepare your claim</h3>
<p>Please gather the following details:</p>
<ul>
  <li>Product name & model number.</li>
  <li>Clear description of the issue.</li>
  <li>Photos or video clearly showing the defect or malfunction.</li>
</ul>
<p><strong>Tip:</strong> Submitting complete information helps us resolve your claim faster.</p>

<h3>c) Submit your claim:</h3>
<p>Submit your warranty claim using one of the following methods:</p>
<ul>
  <li><strong>Email Support:</strong> Send all required details to <a href="mailto:ecom@knobsshop.store">ecom@knobsshop.store</a></li>
  <li><strong>Phone Support:</strong> Call our helping at +91 70924 66600.</li>
</ul>
<p>Your will receive an acknowledgment with a ticket number once your claim is received.</p>

<h3>d) Product Evaluation</h3>
<p>Once we receive your returned item:</p>
<ul>
  <li>Our team will inspect the product.</li>
  <li>Inspection is Typically completed within 3-7 business days</li>
  <li>You will be notified if additional details are needed.</li>
</ul>

<h3>e) Resolution</h3>
<p>
  You shall be responsible for payment of all fees/costs/charges associated with the purchase of
  products from us and you agree to bear any and all applicable taxes including but not limited to
  VAT/CST, service tax, GST, duties and cesses etc.
</p>

<h3>1) Children</h3>
<p>
  Use of Knobshopstore.in is available only to persons who can form a legally binding contract
  under the Indian Contract Act, 1872. If you are a minor i.e. under the age of 18 years, you may
  purchase only with the involvement of a parent or guardian.
</p>

<h3>2) Communications</h3>
<p>
  When you visit Knobshopstore.in, you are communicating with us electronically. You will be
  required to provide a valid phone number while placing an order with us. We may communicate
  with you by e-mail, SMS, phone call or by posting notices on the website or by any other mode
  of communication. For contractual purposes, you consent to receive communications including
  SMS, e-mails or phone calls from us with respect to your order. We will not be responsible for
  any business loss (including loss of profits, revenue, contracts, anticipated savings, data,
  goodwill or wasted expenditure) or any other indirect or consequential loss that is not
  reasonably foreseeable to both you and us when a contract for the sale of goods by us to you
  was formed.
</p>

<h3>Contact Details of Knobs Shop:</h3>
<p>
  Location : 746 - 747, Mettupalayam Road, Sukrawar Pettai, R.S Puram,<br/>
  Coimbatore, Tamil Nadu – 641 002<br/>
  Website : knobsshop.store<br/>
  Email : <a href="mailto:ecom@Knobsshop.store">ecom@Knobsshop.store</a><br/>
  Mobile No : 70924 66600
</p>

<h3>3) Events beyond our reasonable control</h3>
<p>
  We will not be held responsible for any delay or failure to comply with our obligations under
  these conditions if the delay or failure arises from any cause which is beyond our reasonable
  control. This condition does not affect your statutory rights.
</p>

<h3>4) Waiver</h3>
<p>
  If you breach these conditions and we take no action, we will still be entitled to use our rights
  and remedies in any other situation where you breach these conditions.
</p>

<h3>5) Governing Law and Jurisdiction</h3>
<p>
  These conditions are governed by and construed in accordance with the laws of India, and the
  application of the United Nations Convention on Contracts for the International Sale of Goods
  is expressly excluded. You agree, as we do, to submit to the exclusive jurisdiction of the courts at
  Delhi.
</p>
`
function Waranty() {
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

export default Waranty
