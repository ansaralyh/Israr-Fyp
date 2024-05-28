import React from 'react'
import '../EditPostProduct/EditPostProduct.css'

import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

// import pcall from '../../Pages/PostPage/call.png'
// import pmail from '../../Pages/PostPage/sms.png'
// import paddress from '../../Pages/PostPage/location.png'

import backbtn from '../UploadPage/back.png'
import uploadimg from '../UploadPage/uploadimg.png'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const EditPostProduct = () => {
    const [isLoggedIn, setIsloggedIn] = useState(true)
    const navigate = useNavigate()


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
                    const maxWidth = 701;
                    const maxHeight = 455;

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
            setErrorMessage('Please select an image')
        }
    };



    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn} />

            {/* <section className="post-details max-width-1440">

                <div className="left-post">
                    <input type="file" />

                </div>
                <div className="right-post">
                    <input type="text" name="" id="" />
                    <h2 className="post-heading2">Describtion</h2>
                    <input type="text" name="" id="" />
                    <div className="post-contact-links">
                        <div className="post-number">
                            <img src={pcall} alt="" />
                            <input type="text" name="" id="" />

                        </div>
                        <div className="post-mail">
                            <img src={pmail} alt="" />
                            <input type="text" name="" id="" />

                        </div>
                        <div className="post-address">
                            <img src={paddress} alt="" />
                            <input type="text" name="" id="" />

                        </div>

                    </div>



                </div>

            </section> */}

            <section className="upload max-width-1440">
                <div className="back-btn">
                    <img onClick={() => navigate(-1)} src={backbtn} alt="" />

                </div>
                <div className="upload-content">
                    <input className='upload-content-title' type="text" placeholder='Enter your title' />
                    <div className="upload-content-image-section " id='img-box'>
                        <input className='upload-content-image' type="file" accept='image/*' name='image' id='file' onChange={handleImageUpload} />
                        <label htmlFor="file">
                            <div>
                                {selectedImage ? (
                                    <div className='upload-img'>
                                        {/* <img src={selectedImage} alt="Preview" /> */}
                                        <div className="up-img">
                                            <img src={uploadimg} alt="" />
                                            <span className='drag-drop'>Drag & Drop Image</span>
                                        </div>
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
                    <textarea name="" id="" placeholder='Type your desicribtion here ( up to 200 words)' cols="30" rows="1"></textarea>

                </div>
                <div className="upld-btn">
                    <button className='upload-btn'>Upload</button>

                </div>
            </section>

            <Footer />
        </>
    )
}

export default EditPostProduct