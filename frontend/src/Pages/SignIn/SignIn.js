import React, { useEffect } from 'react'
import '../SignIn/SignIn.css'
import signin from '../../Images/Signupimg.png'
import usericon from '../../Images/user.png'
import usernameicon from '../../Images/username.png'
import emailicon from '../../Images/sms.png'
import passwordicon from '../../Images/lock.png'
// import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { register } from '../../store/actions/userActions'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import { CLEAR_ERRORS } from '../../store/constants/userConstants'
const SignIn = () => {
    const dispatch = useDispatch()
    const {error,isAuthenticated,loading} = useSelector(state => state.token) 
    const user = useSelector(state => state.user)
    console.log(error)
    // console.log(user)

    useEffect(()=>{
        if(error){
            if(error.code === 400){
                window.alert('Please fill out all fields in correct format')
            }
            if(error.code === 409){
                window.alert('User with this email already exists')
            }
            dispatch({type:CLEAR_ERRORS})
        }
        
    },[dispatch,error])
    
    // const navigate = useNavigate()
    const handleSignUp = ()=>{
        // navigate('/login')
        // console.log(formik)
       
        const userData = {
            name:formik.values.name,
            userName:formik.values.userName,
            email:formik.values.email,
            password:formik.values.password
        }

        dispatch(register(userData))

    }

    const formik = useFormik({
        initialValues:{
            name:'',
            userName:'',
            email:'',
            password:''
        },
        onSubmit:handleSignUp
    })
    return (
        <>
            <div className="max-width-1440">
                <section className="signin ">

                    <section className="left-section">
                        <h1 className="signinheading">Sign up to <br /> <span className='primary-blue-color'>GB </span> Art Bazaar</h1>
                        <p className="signinpara">GB Art Bazaar is the leading destination
                            to find & showcase creative work and home to the world's best design professionals.</p>

                    <form onSubmit={formik.handleSubmit}>

                        <div className="input-fields">

                            <div className="input-name">
                                <input  maxLength={15} className='name' type="text" placeholder='Name' name='name' id='name' value={formik.values.name} onChange={formik.handleChange}/>
                                <div className="user-icon">
                                    <img src={usericon} alt="" />
                                </div>
                            </div>

                            <div className="input-name">
                                <input className='name' maxLength={20} type="text" placeholder='Username' name='userName' id='userName' value={formik.values.userName} onChange={formik.handleChange}/>
                                <div className="username-icon">
                                    <img src={usernameicon} alt="" />
                                </div>
                            </div>

                            <div className="input-name">
                                <input className='name' maxLength={30} type="Email" placeholder='Email' name='email' id='email' value={formik.values.email} onChange={formik.handleChange}/>
                                <div className="email-icon">
                                    <img src={emailicon} alt="" />
                                </div>
                            </div>

                            <div className="input-name">
                                <input className='name' maxLength={30} type="password" placeholder='Password' name='password' id='password' value={formik.values.password} onChange={formik.handleChange}/>
                                <div className="password-icon">
                                    <img src={passwordicon} alt="" />
                                </div>
                            </div>

                        </div>

                        <button className='submit-btn' type='submit'>{loading ? 'Loading':'Sign Up'}</button>
                    </form>

                    </section>

                    <section className="right-section">
                        <img className='hero-img' src={signin} alt="" />
                    </section>


                </section>

            </div>



        </>
    )
}

export default SignIn