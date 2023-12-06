const {otpCreation,selectOtpData,changeIsValidate}=require("../dblayer/otpquery")
const{ChangePassword}=require("../dblayer/userquery")
const to=require("await-to-js").to
const {mailexits,selectuserbyEmail}=require("../dblayer/userquery")
const {statusCode,messages} =require("../cors/constant")
const moment=require('moment')
const otplib=require("otplib")
// const {generateOTP,sendmail}=require("../cors/otpfunction")
const nodemailer=require("nodemailer")
const axios=require("axios")
const responseHandler=require("../cors/ReasponseHandler")
const bcrypt=require("bcrypt")
const { DATE } = require("sequelize")
const otpGenerationKey=process.env.OTP_SECRET_KEY

const generateOTP=async()=>{
    return await otplib.authenticator.generate(otpGenerationKey)
    }
const otpCreationService=async(req,res)=>{
    const email=req.body.email
    if(mailexits(email)){
        const[error,otp]=await to(generateOTP())
        console.log(otp)
        if(error){
            await responseHandler({
                        statusCode: statusCode.BAD_STATUS,
                        error: true,
                        res,
                        message: messages.OTP_FAILURE,
        })
    }
        else{

            console.log(req.body.email)
            const dataname=await selectuserbyEmail(email)
            console.log("firstName",dataname.firstName)
            console.log("userId",dataname.id)
            const userId=dataname.id
            const firstName=dataname.firstName
            const otpData=parseInt(otp)
            const data=await axios.get(`http://localhost:2000/sendmail?email=${email}&firstName=${firstName}&otp=${otpData}`)
            console.log("data mail send",data)
            const date=new Date()
            const currentdate=moment(date).unix()
            console.log(currentdate)
          
            const [error,otpdata]=await to(otpCreation({otpData,currentdate,type:"login OTP",email,userId}))
            if(error){
                await responseHandler({
                            statusCode: statusCode.BAD_STATUS,
                            error: true,
                            res,
                            message: error.message,
            })
        }
            else{
         await responseHandler({ statusCode: statusCode.OK_STATUS, message: messages.INSERT_MESSAGE, res, data: otpdata });

            }
    }

}
else{
    await responseHandler({
        statusCode: statusCode.BAD_STATUS,
        error: true,
        res,
        message: messages.NOT_VALID,
})
}
}


const verifyOtp=async(OTP,email)=>{
     const[error,data]=await to(selectOtpData(OTP,email))
     if(error){
        await responseHandler({
            statusCode: statusCode.BAD_STATUS,
            error: true,
            res,
            message: error.message,
})
     }
     else{
        console.log("otpdata",data)
        const otp_created_at=data.otp_created
        console.log("otp_created_at",otp_created_at)
        const createdTimeStamp=parseInt(otp_created_at)
        const otpExpiration=createdTimeStamp+(300*60)
        const date=new Date()
        const currentTimeStamp=moment(date).unix()
        console.log("expirationotp",otpExpiration)
        console.log("currentTimeStamp",currentTimeStamp)
        if(otpExpiration>currentTimeStamp){
             return true
        }
        else{
            return false
        }

     }
}

const validateOtpService=async(req,res)=>{
  const {email,OTP,newPassword}=req.body
  console.log("newPassword",newPassword)
  const password=await bcrypt.hash(newPassword,10)
  console.log("password",password)
  if(mailexits(email)){
    const verifiedOtp=await verifyOtp(OTP,email)
    console.log(verifiedOtp)
    if(verifiedOtp){
        const changepassword=await ChangePassword(email,password)
        const changevalidate=await changeIsValidate(email,OTP)
        if(changevalidate && changepassword){

            return await responseHandler({
                statusCode: statusCode.OK_STATUS,
                error: true,
                res,
                message: messages.PASSWORD_CHANGED_SUCCESS,
        })
        }
        else{
            console.log("erooooor")
        }

    }
    else{
        await responseHandler({
            statusCode: statusCode.BAD_STATUS,
            error: true,
            res,
            message: messages.INVALID_OTP,
})
    }
  }
}
module.exports={otpCreationService,validateOtpService}