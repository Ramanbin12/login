const {otpCreationService,validateOtpService}=require("../services/otpService")
const otpCreationController=(req,res)=>{
    otpCreationService(req,res)
}
const validateOtpController=(req,res)=>{
    validateOtpService(req,res)
}
module.exports={otpCreationController,validateOtpController}