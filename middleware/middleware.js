const jwt=require("jsonwebtoken")
const {statusCode,messages}=require("../cors/constant")
const responseHandler=require("../cors/ReasponseHandler")
const authmiddleware=async(req,res,next)=>{
    const  authHeader=req.headers['authorization']
    if(typeof authHeader!=='undefined'){
        console.log("authHeader",authHeader)
        jwt.verify(authHeader,"sdjksdjlk",async(err,authData)=>{
            if(err){
               return await responseHandler({
                statusCode: statusCode.BAD_STATUS,
                error: true,
                res,
                message: err.message,
            })
            }
            else{
                console.log(authData.email)
                req.email=authData.email
                next()
            }
        })
    }
    else{
            await responseHandler({
                statusCode: statusCode.OK_STATUS ,
                message: messages.INVALID_TOKEN,
                error: true,
                res
            })
    }
}
module.exports=authmiddleware