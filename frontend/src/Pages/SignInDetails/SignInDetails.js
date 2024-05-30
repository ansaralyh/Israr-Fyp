import React from 'react'
import '../SignInDetails/SignInDetails.css'

const SignInDetails = () => {
    return (
        <>
            <section className="signin-details max-width-1440">
                <div className="signin-details-next">
                    <div className="signin-details-input">
                        <p >Contact Number:</p>
                        <input type="number" maxLength={13} placeholder='+92' />
                    </div>
                    <div className="signin-details-input">
                        <p >Mailing Address</p>
                        <input type="email" maxLength={30} placeholder='Enter your E-mail' />
                    </div>
                    <div className="signin-details-input">
                        <p >Address</p>
                        <input type="text" maxLength={30} placeholder='Enter your Address' />
                    </div>
                    <button className='submit-btn' type='submit'>Sign In</button>


                </div>

            </section>

        </>
    )
}

export default SignInDetails