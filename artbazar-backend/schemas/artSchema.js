const Joi = require('joi')

exports.artSchema = Joi.object({
    title: Joi.string().required().messages({
        'any.required':'Please Enter Title',
    }),
    images: Joi.required().messages({
        'any.required':'Please Provide Link to images'
    }),
    user_id: Joi.string().required().messages({
        'any.required':'Please Provide user id'
    }),
});
