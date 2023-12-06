const { where } = require("sequelize");
const user=require("../models/user.model");
const { password } = require("../config/dbconfig");
const selectuser=async()=>{
    console.log("nnnn")
    const data= await user.findAll();
    return data
}

const selectuserbyEmail=async(email)=>{
    console.log("nnnn")
    const data= await user.findOne({
        where:{email}});
    return data
}
const insertuser=async(id,firstName,LastName,email,mobileNumber,password)=>{
    return await user.create({id,firstName,LastName,email,mobileNumber,password})
}
const updateuser=async(req,res)=>{
const {email,updatemail}=req.body
const data=await user.findOne({where:{email}})
data.email=updatemail
return await data.save()
}
const deleteuser=async(id)=>{
    return await user.destroy({where:{id}})
}
const mailexits=async(email)=>{

    return await user.findOne({ where: { email } })

}
const login=async(email)=>{
    return await user.findOne({where:{email}})
}

const ChangePassword=async(email,password)=>{

  const data=await user.findOne({where:{email}})
  data.password=password
  return await data.save()
}

const resetPassword=async(email,encrytnewpassword)=>{
    const data=await user.findOne({where:{email}})
    data.password=encrytnewpassword
    return await data.save()
// const[rowsupdated,[updateduser]]= await user.update({password:newPassword},{where:{email},returning:true})
// if(rowsupdated>0){
//     console.log("epdated 1 record",rowsupdated)
//     return [updateduser]
// }
// else{
//     console.log("erroooor")
//     return null
// }
}
module.exports={insertuser,updateuser,deleteuser,selectuser,mailexits,login,resetPassword,selectuserbyEmail,ChangePassword}