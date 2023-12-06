const {otpCreationController,validateOtpController}=require("../controllers/otpController")
const app=require("../index")
require('dotenv').config()
const nodemailer=require("nodemailer")
const path=require("path")
const ejs=require("ejs")
const sendAddress=process.env.SENDER_MAIL_ID
const password=process.env.SENDER_PASSWORD
app.post("/otpCreation",otpCreationController)
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:sendAddress ,
        pass:password,
    }
})
app.get("/sendmail",async(req,res)=>{
    const email=req.query.email
    const firstName=req.query.firstName
    const otp=req.query.otp
    console.log("otp",otp)
    console.log("jjjj",email, firstName)
    console.log(sendAddress)
    console.log("helllllo")
    console.log(__dirname)

    const parentDir=path.resolve(__dirname,'..')
    console.log(parentDir)
    const htmlContent=await ejs.renderFile(path.join(parentDir,'views','mailview.ejs'),{firstName,otp})
    let info=await transporter.sendMail({
        from:sendAddress,
        to:email,
        subject:"password reset",
        html:htmlContent
    })
    console.log("email sent successfully")
    return res.json(info)
 })

 app.post("/validate",validateOtpController)

