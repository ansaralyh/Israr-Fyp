const ErrorHander = require('../utills/errorhandler')
const bcrypt = require('bcryptjs')
const User = require('../Models/userSchema')
const { userSchema, loginSchema, updateUserSchema } = require('../schemas/userSchema')
const jwt = require('jsonwebtoken')
const cloudibary = require('cloudinary')
exports.createUser = async (req, res, next) => {

    try {
        const user = await User.signUp(req.body)
        const token = jwt.sign({ payload: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })

        res.status(200).json({
            success: true,
            token,
            isEmailVerified: user.isEmailVerified
        })

    } catch (error) {
        // console.log(error.name)
        if (error.name === 'Email') {
            console.log('Email error')
            return next(new ErrorHander(error.message, 409))
        }
        else if (error.name === 'validation error') {
            return next(new ErrorHander(error.message, 400))
        }
        else {
            return next(new ErrorHander(error, 500))
        }
    }
}

exports.verifyEmail = async (req, res, next) => {
    try {
        await User.verifyEmail(req.body)

        res.status(200).json({
            success: true,
            message: "Email verified successfully"
        })

    } catch (error) {
        return next(new ErrorHander(error, 500))
    }
}

exports.forgotPassword = async (req, res, next) => {
    try {
        await User.forgotPasswordRequest(req.body)

        res.status(200).json({
            success: true,
            message: "Password Reset token sent successfully"
        })

    } catch (error) {
        return next(new ErrorHander(error, 500))
    }
}

exports.forgotPasswordTokenVerify = async (req, res, next) => {
    try {
        await User.forgotPasswordTokenVerify(req.body)
        res.status(200).json({
            success: true,
            message: "Password Reset token verified successfully"
        })
    } catch (error) {
        return next(new ErrorHander(error, 500))
    }
}
exports.forgetPasswordUpdate = async (req, res, next) => {
    try {
        await User.forgetPasswordUpdate(req.body)
        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })
    } catch (error) {
        return next(new ErrorHander(error, 500))
    }
}

exports.login = async (req, res, next) => {
    try {

        const user = await User.login(req.body)
        const token = jwt.sign({payload:user._id},process.env.JWT_SECRET,{expiresIn:'24h'})
        res.status(200).json({
            success: true,
            token,
            isEmailVerified: user.isEmailVerified,
            isAllDetails:user.isAllDetails
        })

    } catch (error) {
        if (error.name === 'Email') {
            // console.log('Email error')
            return next(new ErrorHander(error.message, 409))
        }
        else if (error.name === 'validation error') {
            return next(new ErrorHander(error.message, 400))
        }
        else {
            return next(new ErrorHander(error, 500))
        }
    }
}


exports.updateUserData = async (req, res, next) => {
    try {
        const data = { ...req.body }
        const { error } = updateUserSchema.validate(data, { abortEarly: false });
        if (error) {
     
            const errorMessages = error.details.map((detail) => detail.message);
            return next(new ErrorHander(errorMessages, 400))
        }

     

        // const myCloud = await cloudibary.v2.uploader.upload(req.files.path,{
        //     folder:'profilePics',
        //     width:150,
        //     crop:'scale'
        // })
        const { email, wNumber,cNumber, address,profileUrl } = req.body

        const user = await User.findOne({ email })
  
        user.wNumber = wNumber
        user.cNumber = cNumber
        user.address = address
        user.profileUrl = profileUrl
        user.isAllDetails = true

        await user.save()

        res.status(200).json({
            success: true,
            user
        })



    } catch (error) {
        console.log(error)
        return next(new ErrorHander(error, 500))
    }
}



exports.loadUser = async (req, res) => {
    try {
        const token = req.header('Authorization')
        // console.log(token)
        if (token) {
            const token = req.header('Authorization').split(' ')[1]
            // console.log(token) 
            jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                // console.log(err)
                if (err) {
                    return res.status(401).json({ error: 'Invalid token , please login again' });
                }

                const userId = decoded.payload;
                // console.log(userId)
                const user = await User.findOne({ _id: userId })
                res.status(200).json({
                    success: true,
                    user
                })
            });
        }
        else {
            res.status(403).json({
                success: false,
                message: "Please provide token to access this route"
            })
        }


    } catch (error) {
        console.log(error)
    }
}

