const joi = require('joi')

const signupValidator = (data) => {
        const userValidator = joi.object({
        name: joi.string()
                .min(3)
                .max(30)
                .required()
        ,
        email: joi.string()
                .min(6)
                .email()
                .required()
        ,
        password: joi.string()
                .min(6)
                .required()
        })

        return userValidator.validate( data )
}

const signinValidator = (data) => {
        const userSignValidator = joi.object({
                email: joi.string()
                        .min(6)
                        .email()
                        .required()
                ,
                password: joi.string()
                        .min(6)
                        .required()
        })

        return userSignValidator.validate( data )
}

module.exports = {
    signupValidator,
    signinValidator
}