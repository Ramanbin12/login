const {selectuserService,insertuserService,updateusersService,deleteuserService,loginService,resetpasswordService}=require("../services/userservice")
const {idSchema,firstNameSchema,LastNameSchema,emailSchema,mobileNumberSchema,roleIdSchema}=require("../cors/validate")
const {statusCode,messages}=require('../cors/constant')
const responseHandler=require("../cors/ReasponseHandler")
const selectuserController=(req,res)=>{
    console.log("selectController")
    selectuserService(req,res)
}
const insertuserController=(req,res)=>{
    const {id,firstName,LastName,email,mobileNumber,role_id}=req.body
    if(idSchema.validate(id).error || firstNameSchema.validate(firstName).error || LastNameSchema.validate(LastName).error || emailSchema.validate(email).error || mobileNumberSchema.validate(mobileNumber).error || roleIdSchema.validate(role_id).error){
        return responseHandler({
            statusCode: statusCode.BAD_STATUS,
            error: true,
            res,
            message: messages.INCORRECT_FORMAT
        })
    }

    else{
    console.log("insertController")
     insertuserService(req,res)
    }
}
const updateuserController=(req,res)=>{
    const {email,updatemail}=req.body
    if(emailSchema.validate(email).error || emailSchema.validate(updatemail).error){
        return responseHandler({
            statusCode: statusCode.BAD_STATUS,
            error: true,
            res,
            message: messages.INCORRECT_FORMAT
        })
    }
    else{
        updateusersService(req,res)
    }
}
const deleteuserController=(req,res)=>{
    deleteuserService(req,res)
}
const loginController=(req,res)=>{
    loginService(req,res)
}
const resetpasswordController=(req,res)=>{
    resetpasswordService(req,res)
}
module.exports={selectuserController,updateuserController,insertuserController,deleteuserController,loginController,resetpasswordController}