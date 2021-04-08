const Joi = require('joi');
// Validation for registering details
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .max(30)
            .required(),
        email: Joi.string()
            .min(6)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .max(30)
            .required(),
    })
    return schema.validate(data)
}
// Validation for login details
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .max(30)
            .required(),
    })
    return schema.validate(data)
}

// Validation for registering Employee details
const employeeCreateValidation = (data) => {
    const schema = Joi.object({
        empId: Joi.integer()
            .min(1)
            .max(4)
            .required(),
        name: Joi.string()
            .min(6)
            .max(30)
            .required(),
        designation: Joi.string()
            .required(),
        department: Joi.string()
            .required(),
        branch: Joi.string()
            .required(),
    })
    return schema.validate(data)
}
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;