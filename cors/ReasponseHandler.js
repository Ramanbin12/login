const responseHandler=({statusCode,message='',error=false,res,data=[]})=>{
    res.json({
        error,
        statusCode,
        message,
        data
    })
}
module.exports=responseHandler