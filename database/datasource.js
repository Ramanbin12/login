const { Sequelize }=require("sequelize")
const {host,user,password,database,dialect}=require("../config/dbconfig")
const sequelize=new Sequelize(database,user,password,{host,dialect})
const modelauthentcation=async()=>{
    try{
        await sequelize.sync({alter:true});
        console.info("model sync ")
    }
    catch(err){
        console.error(err)
    }
}
sequelize.authenticate().then(()=>{
    modelauthentcation()
    console.info("connecton with db successfully")
}).catch((err)=>{
    console.error(err)
})
module.exports=sequelize