const Joi=require("joi")
const idSchema=Joi.number()
const firstNameSchema=Joi.string()
const LastNameSchema=Joi.string()
const emailSchema=Joi.string()
const mobileNumberSchema=Joi.number()
const roleIdSchema=Joi.number()
module.exports={idSchema,firstNameSchema,LastNameSchema,emailSchema,mobileNumberSchema,roleIdSchema}