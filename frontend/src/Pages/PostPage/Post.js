import React, { useEffect } from 'react'
import '../PostPage/Post.css'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import productimg from '../PostPage/product.png'
import propic from '../PostPage/Avatar.png'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'

import PostProduct from '../../Components/PostProduct/PostProduct'
import { getSingleArt } from '../../store/actions/artActions'

const Post = () => {

  const params = useParams()
 const dispatch = useDispatch()
 const {art,loading} = useSelector(state => state.art)
 const {user} = useSelector(state => state.user)
 useEffect(()=>{
   dispatch(getSingleArt(params.id))
  },[dispatch,params])
  console.log(art)
  
  const [isLoggedIn, setIsloggedIn] = useState(true)
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn} />


      {
        loading?(
          <><h1>loading</h1></>
        ):(
          <>
          <section className="post-section">
        <PostProduct user={user} art={art} productimg={productimg} profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

      </section>

          </>
        )
      }

      
      <Footer />
    </>
  )
}

export default Post