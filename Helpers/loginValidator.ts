import Joi from "joi";

export const LoginSchema = Joi.object({
    username: Joi.string().required().max(20), 
    password: Joi.string().required()
})