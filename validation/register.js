const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function ValidateRegisterInput(data){
    let errors = {};
    data.handle = validText(data.handle) ? data.handle : "";
    data.email = validText(data.email)  ? data.email : "" ;
    data.Password = validText(data.Password) ? data.Password : "";
    data.Password2 = validText(data.Password2) ? data.Password2 : "";
    if(!Validator.isLength(data.handle, {min: 2, max: 30 })){
        errors.handle = "Handle must be between 2 and 30 characters";
    }
    if(Validator.isEmpty(data.handle)) {
        errors.handle = "Handle field is required";
    }
    if (Validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    }
    if (!Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }
    if(Validator.isEmpty(data.Password)){
        errors.Password = "Password is required";
    }
    if(!Validator.isLength(data.Password, {min: 6, max: 30 })){
        errors.Password = "Password must be between 2 and 30 characters";
    }
    if(!Validator.equals(data.Password,data.Password2)){
        errors.Password2 = "Passwords must match ";
    }

    return {
        errors,
        isvalid: Object.keys(errors).length===0
    }
}