import React from 'react'
import '../NewPasswordPage/NewPassword.css'

const NewPassword = () => {
  return (
   <>
   <section className="new-password">
    <div className="newpassword">
      <h1>New Password</h1>
      <p>Enter New Password</p>
      <input type="password" placeholder='At least 8 digits' />
      <p>Confirm Password</p>
      <input type="password" placeholder='********' />
      <button>Send</button>
    </div>
   </section>
   
   </>
  )
}

export default NewPassword