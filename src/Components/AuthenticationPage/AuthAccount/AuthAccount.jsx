import React from 'react'
import './AuthAccount.css'
import { useNavigate } from 'react-router-dom'
import logoImage from "../../../Assets/logo.png";
function AuthAccount() {
    const navigate = useNavigate()
  return (
    <>
    <>
    <div className="navbar-middle-container">
      <div className="navbar-middle-logo-wrapper">
        <a href="/">
          <img src={logoImage} alt="Logo" className="navbar-middle-logo" />
        </a>
      </div>
    </div>
    <hr />
  </>
    <div  className='register-page'>
      <div className='register-page-heading'>
        <h1>Enter your email to login or create an account</h1>
      </div>
      <div className='register-page-select-box'>
        <select>
            <option>India</option>
            <option>USA</option>
            <option>Russia</option>
        </select>
      </div>
      <div className='register-page-input'>
        <input type='text' placeholder='Email*' required/>
      </div>
      <div className='or-text'>
        <p>or</p>
      </div>
      <div className='register-page-input'>
        <input type='text' placeholder='Phone Number*' required/>
      </div>
      <div className='register-page-policy'>
        <p>By continuing, I agree to Knob’s <strong>Privacy Policy </strong> and  <strong>Terms of Use.</strong></p>
      </div>
      <div className='continue-btn-div'>
        <button className='register-page-btn' onClick={()=>navigate('/auth/password')}>continue</button>
      </div>

    </div>
    </>
  )
}

export default AuthAccount
