import React, { useEffect } from 'react'
import '../SignIn/SignIn.css'
import '../SignUp/SignUp.css'
import { Link } from 'react-router-dom'
import signin from '../../Images/Signupimg.png'
import usernameicon from '../../Images/username.png'
import passwordicon from '../../Images/lock.png'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useDispatch,useSelector } from 'react-redux'
import { login } from '../../store/actions/userActions'
import {CLEAR_ERRORS} from '../../store/constants/userConstants'
const SignUp = ({ isLoggedIn, setIsloggedIn }) => {

    const navigate = useNavigate()
    const handleLogin = () => {
        console.log('Form Submitted')
        // console.log(formik.values.email,formik.values.password)
        dispatch(login(formik.values.email,formik.values.password))
    }

    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        onSubmit:handleLogin
    })

    const dispatch = useDispatch()
    const {error,isAuthenticated} = useSelector(state => state.token) 
    const user = useSelector(state => state.user)
    console.log(error)
    // console.log(user)

    useEffect(()=>{
        if(error){
            if(error.code === 400){
                window.alert('Please fill out all fields in correct format')
            }
            if(error.code === 409){
                window.alert('Wrong credentials')
            }
            dispatch({type:CLEAR_ERRORS})
        }
        
    },[dispatch,error])

    // useEffect(()=>{
    //     if(isAuthenticated){
    //             navigate('/')
    //     }
    // },[isAuthenticated,user])

    // console.log(error)
    return (
        <>
            <div className="max-width-1440">
                <section className="signup">
                    <section className="left-section">
                        <h1 className="signinheading">Sign In to <br /> <span className='primary-blue-color'>GB </span> Art Bazaar</h1>
                        <p className="signinpara">GB Art Bazaar is the leading destination
                            to find & showcase creative work and home to the world's best design professionals.</p>
                <form onSubmit={formik.handleSubmit}>

                        <div className="input-fields">

                            <div className="input-name">
                                <input className='name' minLength={3} maxLength={30} type="email" placeholder='Email' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} />
                                <div className="username1-icon">
                                    <img src={usernameicon} alt="" />
                                </div>
                            </div>

                            <div className="input-name">
                                <input className='name' minLength={3} maxLength={30} type="password" placeholder='Password' name='password' id='password' value={formik.values.password} onChange={formik.handleChange}/>
                                <div className="password1-icon">
                                    <img src={passwordicon} alt="" />
                                </div>
                            </div>

                        </div>

                        <Link to='/forgetpassword'>
                        <p className="forget-password-btn">forget Password?</p>
                        </Link>

                        

                        <input className='signin-btn' type='submit' value={'Sign In'}/>
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

export default SignUp