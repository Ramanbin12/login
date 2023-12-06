const {selectuser,insertuser,updateuser,deleteuser,mailexits,login,resetPassword}=require("../dblayer/userquery")
const to=require("await-to-js").to
const {messages,statusCode}=require("../cors/constant")
const responseHandler=require("../cors/ReasponseHandler")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const selectuserService=async(req,res)=>{
 const[error,data] =await to(selectuser())
 if (error) {
    await responseHandler({
        statusCode: statusCode.BAD_STATUS,
        error: true,
        res,
        message: error.message,
    })
} else {
    await responseHandler({ statusCode: statusCode.OK_STATUS, message: messages.SELECT_MESSAGE, res, data: data });
}
}
const insertuserService=async(req,res)=>{
    const email=req.body.email
   const mailexit=await (mailexits(email))
   if(mailexit){
    return responseHandler({statusCode:statusCode.OK_STATUS,message:messages.ALREADY_EXISTS,error:true,res})
   } 
   else{
    const {id,firstName,LastName,email,mobileNumber,password,role_id}=req.body
    const encrytpassword=await bcrypt.hash(password,10)
    const [error,data]=await to (insertuser(id,firstName,LastName,email,mobileNumber,encrytpassword,role_id))
    if(error){
        await responseHandler({
            statusCode:statusCode.BAD_STATUS,
            error:true,
            res,
            message:error.message
        })
    
     }
     else{
        await responseHandler({statusCode:statusCode.CREATED_STATUS,message:messages.INSERT_MESSAGE,res,data:data})
     }
   }
}
const updateusersService=async(req,res)=>{

    const email=req.body.updatemail
    const mailexit=await (mailexits(email))
    if(mailexit){
        return await responseHandler({statusCode:statusCode.BAD_STATUS,message:messages.ALREADY_EXISTS,error:true,res})
    }
    else{
        const [error,data]=await to (updateuser(req,res))
        if (error) {
            await responseHandler({
                statusCode: statusCode.BAD_STATUS,
                error: true,
                res,
                message: error.message,
            })
        } else {
            await responseHandler({ statusCode: statusCode.OK_STATUS, message: messages.UPDATE_MESSAGE, res, data: data });
        }
    }
}
const deleteuserService=async(req,res)=>{
    const id=req.query?.id??""
    const [error,data]=await to(deleteuser(id))
    if (error) {
        await responseHandler({
            statusCode: statusCode.BAD_STATUS,
            error: true,
            res,
            message: error.message,
        })
    } else {
        await responseHandler({ statusCode: statusCode.OK_STATUS, message: messages.DELETE_MESSAGE, res, data: data });
    }    
}

const generateToken=async(email)=>{
    const token=await jwt.sign({email},"sdjksdjlk")
    return token
}
const loginService=async(req,res)=>{
    const {email,password}=req.body

    const [error,data]=await to (login(email))
    if(error){
        return await responseHandler({
            statusCode:statusCode.BAD_STATUS,
            error:true,
            res,
            message:error.message
        })
    }
    else{
  
        const passwordMatch=bcrypt.compare(password,data.password)
        if(!passwordMatch){
            return await responseHandler({statusCode:statusCode.BAD_STATUS,message:messages.INVALID_MESSAGE,res})
    
        }
        else{
    
            const t=await generateToken(email)
            const data1={userdata:data,authToken:t}
            res.setHeader('Authorization',t)
            return await responseHandler({statusCode:statusCode.OK_STATUS,message:messages.LOGIN_MESSAGE,res,data:data1})
        }
    }


}

const resetpasswordService=async(req,res)=>{
 const{currentPassword,newPassword}=req.body
 const email=req.email
 console.log("email",email) 
 const passwordMatch=  bcrypt.compare(currentPassword,newPassword)
 console.log(currentPassword,newPassword)
 console.log(passwordMatch)
 if(currentPassword===newPassword){
     return await responseHandler({statusCode:statusCode.BAD_STATUS,message:messages.SAME_PASSWORD,res})
     
    }
    else{
     const encrytnewpassword=await bcrypt.hash(newPassword,10)
    const[error,data]=await to (resetPassword(email,encrytnewpassword))
    if(error){
        return await responseHandler({
            statusCode:statusCode.BAD_STATUS,
            error:true,
            res,
            message:error.message
        })
    }
    else{
        await responseHandler({ statusCode: statusCode.OK_STATUS, message: messages.UPDATE_MESSAGE, res, data: data });

    }
 }


}
module.exports={selectuserService,insertuserService,updateusersService,deleteuserService,loginService,resetpasswordService}