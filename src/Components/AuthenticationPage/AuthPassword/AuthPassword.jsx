import React,{useState} from 'react'
import './AuthPassword.css'
import { useNavigate } from 'react-router-dom'
import logoImage from "../../../Assets/logo.png";
function AuthPassword() {
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
        <h1>What's your password</h1>
      </div>
      <div className='password-page-identifier'>
        <p className='password-page-mailId'>amanda_tata@icloud.com</p>
        <p className='password-page-edit'>Edit</p>
      </div>
      <div className='register-page-input password-input-wrapper'>
        <input type='text' placeholder='Password*' required/>
        <i
          className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
          onClick={togglePasswordVisibility}
        ></i>
      </div>
      <div>
        <p className='forgotten-pass' onClick={()=>navigate('/auth/forgot-pass')}>Forgotten your password</p>
      </div>
      <div className='continue-btn-div'>
        <button className='register-page-btn'  onClick={()=>navigate('/auth/confirm')}>LOG IN</button>
      </div>
    </div>
    </>
  )
}

export default AuthPassword
