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
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy'
// import NavbarTop from './Components/Navbar/NavbarTop/NavbarTop';

function App() {
  return (
    <Router>
      {/* <NewsletterModal /> */}
      {/* <NavbarTop /> */}
      <Routes>x
        <Route path="/" element={<Home />} />
       <Route path='/category/:id' element={<ProductList/>}></Route>
       <Route path='/product/:id' element={<ProductDetails/>}></Route>
       <Route path='/categories' element={<CategoriesHeader/>}></Route>
       <Route path='/terms-condition' element={<TermsAndCondition/>}></Route>
       <Route path='/privacy-policy' element={<PrivacyPolicy/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
