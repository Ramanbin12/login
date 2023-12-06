const {DataTypes} =require('sequelize')
const sequelize = require('../database/datasource')
const user=require("./user.model")
const otp=sequelize.define("otp",{
    otp_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    otp_number:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    otp_created:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    is_validate:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    type:{
        type:DataTypes.STRING,
        values:["login OTP","Payment OTP"]
    },
    otp_choice:{
        type:DataTypes.STRING,
        allowNull:false,

    }
})
otp.belongsTo(user,{
    foreignKey:"id",
    onDelete:"CASCADE"
}) 
module.exports=otp