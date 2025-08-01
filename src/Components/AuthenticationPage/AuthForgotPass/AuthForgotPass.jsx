import React,{useState} from 'react'
import './AuthForgotPass.css'
import { useNavigate } from 'react-router-dom'
import logoImage from "../../../Assets/logo.png";
function AuthForgotPass() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
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
        <h1>Verify your email and enter a new password</h1>
      </div>
      <div>
        <p className='sent-code-tyext'> we've sent a code to</p>
        <div className='password-page-identifier'>
        <p className='password-page-mailId'>amanda_tata@icloud.com</p>
        <p className='password-page-edit'>Edit</p>
      </div>
      </div>
      <div className='register-page-input password-input-wrapper'>
        <input type='text' placeholder='Code*' required/>
        <i className="bi bi-arrow-clockwise"></i>
      </div>
      <div className='register-page-input password-input-wrapper'>
        <input type='text' placeholder='New Password*' required/>
        <i
          className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
          onClick={togglePasswordVisibility}
        ></i>

      </div>
      <div className='forot-pagerule'>
        <p>x minimum of 8 characters</p>
        <p>x uppercase,lowercase letter and one number</p>
      </div>
      <div className='save-can--btn-div'>
        <button className='save-page-can-btn'>Cancel</button>
        <button className='save-page-btn' onClick={()=>navigate('/auth/confirm')}>Save</button>
      </div>

    </div>
    </>
  )
}

export default AuthForgotPass
