import React from 'react'
import '../Reviews/Review.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStar } from '@fortawesome/free-solid-svg-icons'
import ReactStars from 'react-stars'

const Review = ({ reviewpara, reviewimg }) => {
  return (
    <>
      <section className="review">
        <div className="review-card">
          <div className="review-card-up">
            <h1>Hasnain Ali</h1>
            <img src={reviewimg} alt="" />
          </div>
          <div className="review-center">
            <p>{reviewpara}</p>
            
          </div>
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

            <ReactStars count={5} size={24} color2={'#ffd700'} />
          </div>
        </div>
      </section>
    </>
  )
}

export default Review