const statusCode={
    CREATED_STATUS:200,
    BAD_STATUS:400,
    OK_STATUS:200,
    PAGE_NOT_FOUND:404
}
const messages={
    INSERT_MESSAGE:"User Inserted Successfully",
    UPDATE_MESSAGE:"updated Successfully",
    DELETE_MESSAGE:"deleted Successfully",
     SELECT_MESSAGE:"selected Successfully",
    ALREADY_EXISTS:"already exists kindly change your mail id",
    MISSING_RECORD:"No such record is present in database",
    INCORRECT_FORMAT:"Input data is not in the correct format." ,
    INVALID_TOKEN:"Token is not valid",
    LOGIN_MESSAGE:"Login successfully",
    INVALID_MESSAGE:"Invalid credentials",
    SAME_PASSWORD:"your new password is same as your current password",
    RESET_SUCCESS:"your password reset successfully",
    OTP_FAILURE:"Try again",
    NOT_VALID:"this mail id does not exits",
    INVALID_OTP:"OTP has Expired",
    PASSWORD_CHANGED_SUCCESS:"password changed successfully"
}
module.exports={statusCode,messages}