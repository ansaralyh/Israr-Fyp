import React from 'react'
import '../ForgetPasswordPage/ForgetPassword.css'

import { useNavigate } from 'react-router-dom'

const ForgetPassword = () => {
  const navigate = useNavigate()
  return (
    <>
      <section className="forget-password">
        <div className="forgetpassword">
          <h1>Enter Email Address</h1>
          <input type="email" placeholder='Enter your E-mail' />
          <p onClick={()=> navigate(-1)} >Back to sign in</p>
          <button>Send</button>

        </div>

      </section>
    </>
  )
}

export default ForgetPassword