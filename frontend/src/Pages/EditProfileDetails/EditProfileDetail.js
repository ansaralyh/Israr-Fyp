import React, { useEffect, useState } from 'react';
import './EditProfileDetail.css';
import profilepic from '../../Pages/Profile/profilpic.png';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../store/actions/userActions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfileDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAllDetails } = useSelector(state => state.token);

    useEffect(() => {
        if (isAllDetails) {
            navigate('/profile');
        }
    }, [dispatch, isAllDetails]);

    const { user } = useSelector(state => state.user);

    const handleSubmit = async () => {
        if (formik.values.wNumber.length < 10 || formik.values.wNumber.length > 13) {
            setErrorMessage('WhatsApp number must be between 10 and 13 digits.');
            return;
        }
        setErrorMessage('');

        const myForm = new FormData();
        myForm.append('file', selectedImage);
        myForm.append('upload_preset', 'oha7na0l');
        myForm.append('cloud_name', 'drkf8to4g');

        try {
            const res = await axios.post('https://api.cloudinary.com/v1_1/drkf8to4g/image/upload', myForm);
            console.log(res.data.url);

            const data = {
                email: user.email,
                wNumber: formik.values.wNumber.toString(),
                cNumber: formik.values.cNumber.toString(),
                address: formik.values.address,
                profileUrl: res.data.url
            };

            dispatch(updateUserData(data));
        } catch (error) {
            window.alert('Some error occurred, try again later');
        }
    };

    const formik = useFormik({
        initialValues: {
            file: null,
            wNumber: '',
            cNumber: '',
            address: ''
        },
        onSubmit: handleSubmit
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const image = new Image();

                image.onload = () => {
                    const { width, height } = image;
                    const minWidth = 50;
                    const minHeight = 50;
                    const maxWidth = 1200;
                    const maxHeight = 1200;

                    if (
                        width >= minWidth &&
                        height >= minHeight &&
                        width <= maxWidth &&
                        height <= maxHeight
                    ) {
                        setSelectedImage(reader.result);
                        setErrorMessage('');
                    } else {
                        setErrorMessage('Image size is not within the allowed limits (50-1200 x 50-1200).');
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

    const handleNumberChange = (event, field) => {
        const value = event.target.value;
        if (value.length <= 13) {
            formik.setFieldValue(field, value);
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <form onSubmit={formik.handleSubmit}>
                <section className="profile-form">
                    <label htmlFor="file" style={{ cursor: 'pointer' }}>
                        <div>
                            {selectedImage ? (
                                <div className="profile-form-left">
                                    <div className="profile-form-left-img">
                                        {selectedImage && <img src={selectedImage} alt="Selected Img" />}
                                    </div>
                                </div>
                            ) : (
                                <div className="profile-form-left">
                                    <div className="profile-form-left-img">
                                        <img src={profilepic} alt="" />
                                    </div>
                                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                                </div>
                            )}
                        </div>
                    </label>
                    <input type="file" id="file" name="file" style={{ display: 'none' }} onChange={handleImageUpload} />
                    <div className="profile-form-right">
                        <div className="form-inputs">
                            <label htmlFor="wNumber">WhatsApp Number</label>
                            <input
                                type="number"
                                id="wNumber"
                                name="wNumber"
                                placeholder="Enter Your WhatsApp number"
                                onChange={(e) => handleNumberChange(e, 'wNumber')}
                                value={formik.values.wNumber}
                            />
                        </div>
                        <div className="form-inputs">
                            <label htmlFor="cNumber">Contact Number</label>
                            <input
                                type="number"
                                id="cNumber"
                                name="cNumber"
                                placeholder="Enter Your contact number"
                                onChange={(e) => handleNumberChange(e, 'cNumber')}
                                value={formik.values.cNumber}
                                maxLength={13}
                            />
                        </div>
                        <div className="form-inputs">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                maxLength={30}
                                id="address"
                                name="address"
                                placeholder="Enter Your Address"
                                onChange={formik.handleChange}
                                value={formik.values.address}
                            />
                        </div>
                        <button type="submit" className="form-save-btn">Save & Continue</button>
                    </div>
                </section>
            </form>
        </div>
    );
};

export default EditProfileDetail;
