import React from 'react'
import './Verification.css'

const Verification = () => {
  return (
    <>
    <section className="verification">
      <div className="verification-content">
        <h1>Enter Verification Code</h1>
        <div className="code">
          <input type="number" />
          <input type="number" />
          <input type="number" />
          <input type="number" />
        </div>
        <div className="resend">
          <p>If you didn’t receive a code, </p>
          <p className='resend-code'>Resend</p>
        </div>
        <button>Send</button>
      </div>
    </section>
    
    </>
  )
}

export default Verification