import Joi from "joi";

export const RegisterSchema = Joi.object({
    username: Joi.string().required().max(20), 
    fullname: Joi.string().required().max(30), 
    email: Joi.string().required().email(), 
    age: Joi.number().required(), 
    roles: Joi.string().required(),
    password: Joi.string().required().min(6).max(30)
})