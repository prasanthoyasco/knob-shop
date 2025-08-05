import React from 'react'
import './Sale.css'
import { useNavigate } from 'react-router-dom'
function Sale() {
  const navigate = useNavigate()
  return (
    <div className='sale-container' >
      <p className='mb-3'>Mid Season Sale</p>
      <hr/>
      <h3 className='mt-'>UP TO 50% OFF SELECTED STYLES</h3>
      <hr/>
      <p className='mt-2'>Get your own today. Connect with our designers!</p>
      <button className='p-3 sale-button mt-4' onClick={()=>navigate('/book-consultation')}>BOOK CONSULTATION</button>
    </div>
  )
}

export default Sale
