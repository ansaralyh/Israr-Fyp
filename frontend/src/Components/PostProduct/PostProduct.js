import React from 'react'
import '../PostProduct/PostProduct.css'
import pcall from '../../Pages/PostPage/call.png'
import pmail from '../../Pages/PostPage/sms.png'
import paddress from '../../Pages/PostPage/location.png'

import Review from '../../Components/Reviews/Review'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStar } from '@fortawesome/free-solid-svg-icons'

import profileimage from '../../Components/PostProduct/profileimage.png'
import ReactStars from 'react-stars'
import { Link } from 'react-router-dom'


const PostProduct = ({ user, art, productimg, profilepic, username, userdate }) => {

    console.log(user)
    return (
        <>
            <section className="post-details max-width-1440">

                <div className="left-post">
                    <img className='product-img' src={art?.result?.imageUrl} alt="" />

                    {
                        (user?._id === art?.result?.user_id?._id) && (

                            <div className="left-post-btn">
                                <Link to='/editpostproduct'>
                                    <button className='edit-post-btn'>Edit your post </button>
                                </Link>
                                <button className='dlt-post-btn'>Delete your post </button>
                            </div>
                        )
                    }
                </div>
                <div className="right-post">
                    <h1 className="post-heading">{art?.result?.title}</h1>
                    <div className="review-card-stars">
                        {/* <input type="radio" name="rate" id="rate-5" />
                        <FontAwesomeIcon for="rate-5" className='fastar' icon={faStar} />
                        <input type="radio" name="rate" id="rate-4" />
                        <FontAwesomeIcon for="rate-4" className='fastar' icon={faStar} />
                        <input type="radio" name="rate" id="rate-3" />
                        <FontAwesomeIcon for="rate-3" className='fastar' icon={faStar} />
                        <input type="radio" name="rate" id="rate-2" />
                        <FontAwesomeIcon for="rate-2" className='fastar' icon={faStar} />
                        <input type="radio" name="rate" id="rate-1" />
                        <FontAwesomeIcon for="rate-1" className='fastar' icon={faStar} /> */}

                        <ReactStars count={5} size={24} color2='#ffd700' />
                    </div>
                    <div className="profile-link1">
                        <img className='post-proimg' src={art?.result?.user_id?.profileUrl} alt="" />
                        <p className="users-name">{art?.result?.user_id?.userName}</p>
                        <div className="usergap"></div>
                        <p className="users-date">{new Date(art?.result?.publishedDate).toDateString()}</p>
                    </div>
                    <h2 className="post-heading2">Describtion</h2>
                    <p className="post-para">{art?.result?.description} </p>
                    <div className="post-contact-links">
                        <div className="post-number">
                            <img src={pcall} alt="" />
                            <p>Contact Number: {art?.result?.user_id?.wNumber}</p>

                        </div>
                        <div className="post-mail">
                            <img src={pmail} alt="" />
                            <p>Mailing Address: {art?.result?.user_id?.email}</p>

                        </div>
                        <div className="post-address">
                            <img src={paddress} alt="" />
                            <p>Addrss: {art?.result?.user_id?.address}</p>

                        </div>

                    </div>
                    <div className="reviews">
                        <div className="review-cards">
                            <Review reviewpara="The intricately hand-carved wooden sculpture I recently encountered is a true masterpiece of artistic excellence and craftsmanship. This remarkable piece captivates the imagination with its exquisite details and captivating beauty." reviewimg={profileimage} />
                            <Review reviewpara="The intricately hand-carved wooden sculpture I recently encountered is a true masterpiece of artistic excellence and craftsmanship. This remarkable piece captivates the imagination with its exquisite details and captivating beauty." reviewimg={profileimage} />
                            <Review reviewpara="The intricately hand-carved wooden sculpture I recently encountered is a true masterpiece of artistic excellence and craftsmanship. This remarkable piece captivates the imagination with its exquisite details and captivating beauty." reviewimg={profileimage} />
                            <Review reviewpara="The intricately hand-carved wooden sculpture I recently encountered is a true masterpiece of artistic excellence and craftsmanship. This remarkable piece captivates the imagination with its exquisite details and captivating beauty." reviewimg={profileimage} />
                        </div>

                    </div>


                </div>

            </section>


        </>
    )
}

export default PostProduct