import React, { useEffect } from 'react'
import '../UploadPage/Upload.css'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import backbtn from '../UploadPage/back.png'
import uploadimg from '../UploadPage/uploadimg.png'
import { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { uploadArt } from '../../store/actions/artActions'
import { useDispatch,useSelector } from 'react-redux'
// import { isDisabled } from '@testing-library/user-event/dist/utils'



const Upload = () => {
  const [isLoggedIn, setIsloggedIn] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.user)
  const {success} = useSelector(state => state.uploadArt)

  // console.log(user._id)

  // const [selectedImage, setSelectedImage] = useState(null);

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     setSelectedImage(reader.result);
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  useEffect(()=>{
    if(success){
      navigate('/profile')
    }
  },[dispatch,success])

  const handleSubmit = async ()=>{
    const myForm = new FormData()
    myForm.append('file',selectedImage)
    myForm.append('upload_preset','oha7na0l')
    myForm.append('cloud_name','drkf8to4g')
    try {
        const res = await axios.post('https://api.cloudinary.com/v1_1/drkf8to4g/image/upload',myForm)
      
        const data = {
         
            title:formik.values.title,
            description:formik.values.description,
            imageUrl:res.data.url,
            user_id:user._id
        }
        dispatch(uploadArt(data))
    } catch (error) {
        console.log(error)
        window.alert('Please check your internet connection')
    }
  }
const formik = useFormik({
  initialValues:{
    title:'',
    description:''
  },

  onSubmit:handleSubmit
})


  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    // Check if the file is an image
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const image = new Image();

        image.onload = () => {
          // Get the width and height of the image
          const { width, height } = image;

          // Define the minimum and maximum allowed sizes
          const minWidth = 100;
          const minHeight = 100;
          const maxWidth = 1200;
          const maxHeight = 1200;

          // Perform size validation here
          if (
            width >= minWidth &&
            height >= minHeight &&
            width <= maxWidth &&
            height <= maxHeight
          ) {
            // Image size is valid, set the selected image and show success message
            setSelectedImage(reader.result);
            setErrorMessage('');
          } else {
            // Image size is not valid, show an error message
            setErrorMessage(
              'Image size is not within the allowed limits(100-701 x 100-445). Please choose an image with appropriate dimensions.'
            );
            setSelectedImage(null);
          }
        };

        image.src = reader.result;
      };

      reader.readAsDataURL(file);
    } else {
      setErrorMessage('Please select an image');
      setSelectedImage(null);
    }
  };






  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn} />

      <form onSubmit={formik.handleSubmit}>
      <section className="upload max-width-1440">
        <div className="back-btn">
          <img onClick={() => navigate(-1)} src={backbtn} alt="" />

        </div>
        <div className="upload-content">
          <input className='upload-content-title' name='title' type="text" placeholder='Enter your title' onChange={formik.handleChange} value={formik.values.title}/>
          <div className="upload-content-image-section " id='img-box'>
            <input className='upload-content-image' type="file" accept='image/*' name='file' id='file' onChange={handleImageUpload} />
            <label htmlFor="file">
              <div>
                {selectedImage ? (
                  <div className='upload-img'>
                    {/* <img src={selectedImage} alt="Preview" /> */}
                    {selectedImage && <img src={selectedImage} alt="Selected" />}
                  </div>
                ) : (
                  // <img src={uploadimg} alt="Preview" />
                  <>
                    <div className='upload-photo'>
                      <div className="up-img">
                        <img src={uploadimg} alt="" />
                        <span className='drag-drop'>Drag & Drop Image</span>
                      </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                  </>


                )}
              </div>
            </label>

          </div>
          <textarea name="description" id="" placeholder='Type your desicribtion here ( up to 200 words)' cols="30" rows="1" onChange={formik.handleChange} value={formik.values.description}></textarea>

        </div>
        <div className="upld-btn">
          <button type='submit' className='upload-btn'>Upload</button>

        </div>
      </section>
      </form>
     

      <Footer />


    </>
  )
}


export default Upload