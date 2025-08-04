import 'modern-css-reset/dist/reset.min.css';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './Pages/Home';
import NewsletterModal from './Components/NewsletterModal/NewsletterModal';
import { ProductList } from './Pages/ProductList';
import CategoriesHeader from './Components/CategoriesPage/CategoriesHeader/CategoriesHeader';
import TermsAndCondition from './Components/TermsAndCondition/TermsAndCondition'
import { ProductDetails } from './Pages/ProductDetails';
import CartDrawer from './Components/CartDrawer/CartDrawer'
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy'
import ScrollToTop from './ScrollToTop/ScrollToTop';
import CartPage from './Components/CartPage/CartPage';
import { useCart } from './Context/CartContext';
import PaymentPage from './Components/PaymentPage/PaymentPage';
import { OrderTracking } from './Pages/OrderTracking';
import OrderConfirmed from './Pages/OrderConfirmed';
import { Notfound } from './Pages/Notfound';
import Order from './Components/TermsAndCondition/Order';
import Return from './Components/TermsAndCondition/Return';
import Pricing from './Components/TermsAndCondition/Pricing';
import Waranty from './Components/TermsAndCondition/Waranty';
import ShippingPage from './Components/ShippingPage/ShippingPage'
import Broucher from './Components/Broucher/Broucher';
import AuthAccount from './Components/AuthenticationPage/AuthAccount/AuthAccount';
import AuthPassword from './Components/AuthenticationPage/AuthPassword/AuthPassword';
import AuthForgotPass from './Components/AuthenticationPage/AuthForgotPass/AuthForgotPass';
import AuthConfirm from './Components/AuthenticationPage/AuthConfirm/AuthConfirm';
import ProfilePageSidebar from './Components/ProfilePage/ProfilePageSidebar/ProfilePageSidebar';
import ProfilePage from './Components/ProfilePage/ProfilePage';
// import NavbarTop from './Components/Navbar/NavbarTop/NavbarTop';

function App() {
  const { drawerOpen, toggleDrawer, cartItems, removeFromCart, recommendedItems, addToCart } = useCart();
  return (

    <Router>
      {/* <NewsletterModal /> */}
      {/* <NavbarTop /> */}
      <ScrollToTop/>
      <div className="page-fade">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/category/:categoryId' element={<ProductList />} />
        <Route path="/products/search/:query" element={<ProductList />} />
        <Route path='/products/brand/:brandName' element={<ProductList />} />
       <Route path='/product/:id' element={<ProductDetails/>}></Route>
       <Route path='/categories' element={<CategoriesHeader/>}></Route>
       <Route path='/terms-condition' element={<TermsAndCondition/>}></Route>
       <Route path='/privacy-policy' element={<PrivacyPolicy/>}></Route>
       <Route path='/return-policy' element={<Return/>}></Route>
       <Route path='/waranty-policy' element={<Waranty/>}></Route>
       <Route path='/pricing-policy' element={<Pricing/>}></Route>
       <Route path='/order-policy' element={<Order/>}></Route>
       <Route path='/shipping' element={<ShippingPage/>}></Route>
       <Route path='/view-cart' element={<CartPage/>}></Route>
       <Route path='/payment' element={<PaymentPage/>}></Route>
       <Route path='/Tracking' element={<OrderTracking/>}></Route>
       <Route path='/order-confirmed' element={<OrderConfirmed/>}></Route>
       <Route path="/brouchers" element={<Broucher/>} />
       <Route path="/auth/register" element={<AuthAccount/>} />
       <Route path="/auth/password" element={<AuthPassword/>} />
       <Route path="/auth/forgot-pass" element={<AuthForgotPass/>} />
       <Route path="/auth/confirm" element={<AuthConfirm/>} />
       <Route path="/profile-page" element={<ProfilePage/>} />
       <Route path="*" element={<Notfound />} />
      </Routes>
      </div>
       <CartDrawer
        show={drawerOpen}
        onClose={() => toggleDrawer(false)}
        cartItems={cartItems}
        onRemove={removeFromCart}
        recommendedItems={recommendedItems}
        onAddToCart={addToCart}
      />
    </Router>
  );
}

export default App;
