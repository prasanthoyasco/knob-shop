import React,{useState} from 'react'
import './PaymentPage.css'
import Footer from '../Footer/Footer'
import NavbarTop from '../Navbar/NavbarTop/NavbarTop'
import payImage1 from '../../../public/payment-icon/discover.svg'
import payImage2 from '../../../public/payment-icon/master.svg'
import payImage3 from '../../../public/payment-icon/paypal.svg'
import payImage4 from '../../../public/payment-icon/visa.svg'
import productImage from '../../Assets/Product Categories and its Product (Knobs Shop)/Smart Door Lock/Smart Door Lock/Luna Pro+ Facial/14_0fb7187f-b413-411d-a145-e62b8c9e41bb.jpg'
const cardImages = [payImage1, payImage2, payImage3, payImage4];
function PaymentPage() {
    const [deliveryOption, setDeliveryOption] = useState("ship");

  return (
    <>
    <NavbarTop/>
    <div className='payment-page-container'>
      <div className='payment-page-left-side'>
            <div className='contact-container'>
                <div className='contact-con-head'>
                    <h3 className='contact-con-head-h3'>CONTACT</h3>
                    <a href='login'>Log in</a>
                </div>
                <input type='text' placeholder='Email or Mobile Phone Number' className='contact-con-input'/>
                <div className='contact-con-checkbox-text'>
                    <input type='checkbox'/>
                    <p>Email me with news and offers</p>
                </div>
            </div>
            <div className='deliver-section-container'>
                <h3 className='contact-con-head-h3'>DELIVERY</h3>
                <div className='payment-page-delivery-sec'>
                <label className='radio-btn-delivery-text'>
  <input type='radio' name='delivery' className='radio-input'checked={deliveryOption === 'ship'} onChange={() => setDeliveryOption('ship')}/>
  <span className='radio-btn-delivery'></span>
  <p className='radio-btn-text'>Ship</p>
</label>

                <i className="bi bi-truck"></i>
                </div>
            </div>
            <div className='payment-page-delivery-sec'>
                <label className='radio-btn-delivery-text'>
  <input type='radio' name='delivery' className='radio-input'checked={deliveryOption === 'pickup'}onChange={() => setDeliveryOption('pickup')}/>
  <span className='radio-btn-delivery'></span>
  <p className='radio-btn-text'>Pickup in store</p>
</label>

<i class="bi bi-shop"></i>
                </div>
                {deliveryOption === 'ship' && (
                <div className='shop-conatiner'>
        <select className='select-box'>
            <option>India</option>
            <option>US</option>
            <option>UK</option>
        </select>
        <div className='first-last-name-input-div'>
            <input type='text' placeholder='First Name' className='first-name-input'/>
            <input type='text' placeholder='Last Name' className='first-name-input'/>
        </div>
        <input type='text' className='contact-con-input'placeholder='Address'/> 
        <div className='first-last-name-input-div'>
            <input type='text' placeholder='City' className='first-name-input'/>
            <select className='first-name-input'>
                <option>Tamil Nadu</option>
                <option>Kerala</option>
                <option>Andhra</option>
            </select>
            <input type='text' placeholder='Zip Code' className='first-name-input'/>
        </div>
        <div className='contact-con-checkbox-text'>
            <input type='checkbox'/>
            <p>Save the information for the next time</p>
        </div>
      </div>
      )}
      {deliveryOption === 'pickup' && (
        <div className='pick-conatiner'>
            <div className='contact-con-head'>
                <h3 className='contact-con-head-h3'>Store Location</h3>
                <a href='login'>change location</a>
            </div>
            <p>There is 1 store with stock close to chennai,Tamil,Nadu,India</p>
            <div className='use-my-loction-div'>
                <p>Use my location</p>
            </div>
            <div className='hr-line-pickup'>
                <hr/>
                <p>X</p>
                <hr/>
            </div>
        <select className='select-box'>
            <option>India</option>
            <option>US</option>
            <option>UK</option>
        </select>
        <div className='pick-up-address-div'>
            <input type='text' className='contact-con-input'placeholder='Address'/> 
            <button className='find-store-btn'>FIND STORE</button>
        </div>
      </div>
      )}

      <div className='shipping-method-container'>
        <h3 className='contact-con-head-h3'>SHIPPING METHOD</h3>
        <div className='shipping-method-containe-text'>Enter your shipping address to view available shipping methods</div>
        <div className='contact-con-checkbox-text'>
            <input type='checkbox'/>
            <p>Save the information for the next time</p>
        </div>
        <div className='shop-conatiner'>
        <select className='select-box'>
            <option>India</option>
            <option>US</option>
            <option>UK</option>
        </select>
        <div className='first-last-name-input-div'>
            <input type='text' placeholder='First Name' className='first-name-input'/>
            <input type='text' placeholder='Last Name' className='first-name-input'/>
        </div>
        <input type='text' className='contact-con-input'placeholder='Address'/> 
        <div className='first-last-name-input-div'>
            <input type='text' placeholder='City' className='first-name-input'/>
            <select className='first-name-input'>
                <option>Tamil Nadu</option>
                <option>Kerala</option>
                <option>Andhra</option>
            </select>
            <input type='text' placeholder='Zip Code' className='first-name-input'/>
        </div>
      </div>
      </div>

      <div className='payment-section'>
        <h3 className='contact-con-head-h3'>Payment</h3>
        <p>All transactions are secure and encrpted</p>
        <div className='card-container'>
            <div className='payment-page-delivery-sec'>
            <label className='radio-btn-delivery-text'>
            <input type='radio' name='delivery' className='radio-input' />
            <span className='radio-btn-delivery'></span>
            <p className='radio-btn-text'>Credit Card</p>
            </label>
            </div>
            <div className='shop-conatiner-payemnt'>
            <input type='text' className='contact-con-input'placeholder='Address'/> 
        <div className='first-last-name-input-div'>
            <input type='text' placeholder='First Name' className='first-name-input'/>
            <input type='text' placeholder='Last Name' className='first-name-input'/>
        </div>
        <input type='text' className='contact-con-input'placeholder='Address'/> 
        <div className='card-image-payment'>
            {cardImages.map((image)=>(
                <img src={image}/>
            ))}
        </div>
      </div>
      <div className='payment-page-delivery-sec'>
            <label className='radio-btn-delivery-text'>
            <input type='radio' name='delivery' className='radio-input' />
            <span className='radio-btn-delivery'></span>
            <p className='radio-btn-text'>UPI</p>
            </label>
            </div>
        <div className='upi-inside-container'>

            <div className='scaner'>
            <p>Scan and pay by any UPI app on your phone</p>
            <div className='upi-image-payment'>
            {cardImages.map((image)=>(
                <img src={image}/>
            ))}
            </div>
            <div className='qr-code-con'>
                <p>Generate QR Code</p>
            </div>
            </div>
            <div className='enter-upi-id-div'>
                <h6>Pay with UPI id</h6>
                <p>Enter your UPI id</p>
                <input type='text' placeholder='UPI id' className='contact-con-input'/>
            </div>
        </div>
        <div className='payment-page-delivery-sec'>
            <label className='radio-btn-delivery-text'>
            <input type='radio' name='delivery' className='radio-input' />
            <span className='radio-btn-delivery'></span>
            <p className='radio-btn-text'>Cash on Delivery(COD)</p>
            </label>
            </div>
        </div>
      </div>
      <button className='pay-now-btn'>PAY NOW</button>
      <hr/>

      </div>
      <div className='payment-page-right-side'>
        <h5>Arriving 19 jun 2025</h5>
        <p>If you order in the next 20 hours and 34 minutes</p>
        <div className="payment-product-image-div">
            <div className='payment-product-image'>
            <img src={productImage}  loading="lazy" />
                <div className="payment-product-image-content">
                    <p>Brand : yale</p>
                    <h3>YDME50NxT Smart door lock</h3>
                    <p>Color :Black</p>
                </div>
            </div>
            <p className='payment-price'>₹ 89,999</p>
        </div>
        <div className='total-calc'>
            <div className='sub-cal'>
                <p>Subtotal</p>
                <p>₹ 89,999</p>
            </div>
            <div className='sub-cal'>
                <p>Shipping</p>
                <p>₹ 00</p>
            </div>
            <div className='sub-cal'>
                <h5>Total</h5>
                <h5>₹ 89,999</h5>
            </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default PaymentPage
