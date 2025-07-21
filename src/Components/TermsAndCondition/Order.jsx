import React from 'react'
import NavbarTop from '../Navbar/NavbarTop/NavbarTop'
import Footer from '../Footer/Footer'
const htmlContent = `

<h1>CONDITIONS OF SALE (BETWEEN SELLERS AND THE CUSTOMER)</h1>

<div class="section">
  <p>Please read these conditions carefully before placing an order for any products with the Sellers ("We" or "Our" or "Us", wherever applicable) on the Knobsshopstore.in (the website). These conditions signify your agreement to be bound by these conditions.</p>

  <p>In addition, when you use any current or future Knobsshopstore.in service (e.g.: Wishlist or Marketplace or Knobsshop MP3 Service), you will also be subject to the terms, guidelines and conditions applicable to that service ("Terms"). If these Conditions of Sale are inconsistent with such Terms, the Terms will control.</p>
</div>

<div class="section">
  <h2>1) Conditions Relatin to the Sale of Products to You</h2>
  <p>This section deals with conditions relating to the sale of products on the website by us to you.</p>
</div>

<div class="section">
  <h2>1) Our Contract</h2>
  <p>Your order is an offer to us to buy the product(s) in your order. When you place an order to purchase a product from us, you will receive an e-mail confirming receipt of your order and containing the details of your order (the "Order Confirmation E-mail"). The Order Confirmation E-mail is acknowledgement that we have received your order, and does not confirm acceptance of your offer to buy the product(s) ordered.</p>

  <p>We only accept your offer, and conclude the contract of sale for a product ordered by you, when the product is dispatched to you and an e-mail confirmation is sent to you that the product has been dispatched to you (the "Dispatch Confirmation E-mail").</p>

  <p>If your order is dispatched in more than one package, you may receive a separate Dispatch Confirmation E-mail for each package, and each Dispatch Confirmation E-mail and corresponding dispatch will conclude a separate contract of sale between you and us for the product(s) specified in that Dispatch Confirmation E-mail.</p>

  <p>Your contract is with us (the Sellers) and you confirm that the product(s) ordered by you are purchased for your internal / personal purpose and not for re-sale or business purpose. You authorize us to declare and provide declaration to any governmental authority on your behalf stating the aforesaid purpose of the products ordered by you on the website.</p>

  <p>You can cancel your order for a product at no cost any time before we send the Dispatch Confirmation E-mail relating to that product.</p>

  <p>Please note that we sell products only in quantities which correspond to the typical needs of an average household. This applies both to the number of products ordered within a single order and the placing of several orders for the same product where the individual orders comprise a quantity typical for a normal household.</p>
</div>

<div class="section">
  <h2>2) Returns</h2>
  <p>Most items purchased from sellers listed on Knobsshopstore.in are returnable within the return window, except those that are explicitly identified as not returnable. The return is processed only if:</p>
  <ul>
    <li>it is determined that the product was not damaged while in your possession;</li>
    <li>the product is not different from what was shipped to you;</li>
    <li>the product is returned in original condition (with brand's/manufacturer's box, MRP tag intact, user manual, warranty card and accessories).</li>
  </ul>

  <p>You can review return policy for products listed on Knobsshopstore.in by clicking here:
    <a href="https://Knobsstore.in" target="_blank">https://Knobsstore.in</a>
  </p>

  <p>For the products that are returned by the customer, the refund is issued to the original payment method (in case of pre-paid transactions) or to the bank account / as Knobsshop Pay balance (in case of Pay on Delivery orders), the details for making such refund and the timelines are detailed in the refund policy available here:
    <a href="https://www.Knobsshopstore.in" target="_blank">https://www.Knobsshopstore.in</a>
  </p>

  <p>Please review our Returns Policy, which applies to products sold by us.</p>
</div>
`
function Order() {
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

export default Order
