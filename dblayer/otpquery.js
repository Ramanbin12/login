const otp=require("../models/otp.model")
const otpCreation=async({otpData,currentdate,type,email,userId})=>{
    const otpnumber=parseInt(otpData,10)
    return await otp.create({otp_number:otpnumber,otp_created:currentdate,type:type,otp_choice:email,id:userId})
}

const changeIsValidate=async(email,OTP)=>{
    const data=await otp.findOne({where:{otp_number:OTP,otp_choice:email}})
    data.is_validate=true
    return await data.save()
}

const selectOtpData=async(OTP,email)=>{
    return await otp.findOne({where:{otp_number:OTP,otp_choice:email}})
}
module.exports={otpCreation,changeIsValidate,selectOtpData}  