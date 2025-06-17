import React from 'react'
import './CartPage.css'
import image from '../../Assets/Product Categories and its Product (Knobs Shop)/Smart Door Lock/Smart Door Lock/Luna Pro+ Facial/14_0fb7187f-b413-411d-a145-e62b8c9e41bb.jpg'
import NavbarTop from '../Navbar/NavbarTop/NavbarTop'
import Footer from '../Footer/Footer'
import orderImage from '../../Assets/CategoriesImge/Knob Shop/note.png'
function CartPage() {
  return (
    <>
    <NavbarTop/>
    <div className='shopping-cart-container'>
      <div className='shopping-cart-heading'>
        <h1>YOUR SHOPPING CART</h1>
      </div>
      {/* <div className='shopping-cart-table-head'>
        <p>PRODUCT</p>
        <p>QUANTITY</p>
        <p>TOTAL</p>
      </div>
      <div className='shopping-cart-table-product'>
            <div>
            <div className='shopping-cart-table-product-image'>
                <img src={image}/>
                <div className='shopping-cart-table-product-image-content'>
                    <p>Brant : Yale</p>
                    <h3>YDME50NxT Smart Door Lock</h3>
                    <p>Color : Black</p>
                </div>
            </div>
            <button className='continue-shopping-btn'>CONTINUE SHOPPING</button>
            </div>
            <div className='shopping-cart-table-product-count'>
                <div className='shopping-cart-table-product-count-btn'>
                    <button>-</button>
                    <input type='text' value='1'/>
                    <button>+</button>
                </div>
                <div className='delete-icon'><i class="bi bi-trash"></i></div>
            </div>
            <div className='shopping-cart-table-product-total'>
                <h3>₹ 89,299</h3>
            </div>
      </div> */}
      <div className='shopping-cart-table-head'>
  <div className='head-product'>PRODUCT</div>
  <div className='head-quantity'>QUANTITY</div>
  <div className='head-total'>TOTAL</div>
</div>

<div className='shopping-cart-table-product'>
  <div className='shopping-cart-table-product-image'>
    <img src={image} alt='product' />
    <div className='shopping-cart-table-product-image-content'>
      <p>Brand : Yale</p>
      <h3>YDME50NxT Smart Door Lock</h3>
      <p>Color : Black</p>
    </div>
  </div>

  <div className='shopping-cart-table-product-count'>
    <div className='shopping-cart-table-product-count-btn'>
      <button>-</button>
      <input type='text' value='1' readOnly />
      <button>+</button>
    </div>
    <div className='delete-icon'><i className='bi bi-trash'></i></div>
  </div>

  <div className='shopping-cart-table-product-total'>
    <h3>₹ 89,299</h3>
  </div>
</div>

      <div className='shopping-details-container'>
        <div className='instruction-container'>
            <div className='instruction-container-head'>
                <i class="bi bi-pencil-square"></i>
                <p>Order Special Instruction</p>
            </div>
            <textarea/>
        </div>
        <div className='shipping-container'>
            <div className='instruction-container-head'>
                <i class="bi bi-truck"></i>
                <p>Estimate Shipping Rates</p>
            </div>
            <select>
                <option>US</option>
                <option>UK</option>
                <option>India</option>
            </select>
            <input type='text' placeholder='Postal/Zip Code' className='postal-code-input'/>
        </div>
        <div className='check-out-container'>
            <h3>Subtotal ₹ 89,299</h3>
            <p>Taxes and Shipping Calculated at Checkout</p>
            <button>CHECK OUT</button>
            <p>We accept</p>
        </div>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default CartPage
