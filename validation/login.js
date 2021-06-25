const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function (data) {
    let errors = {};
    data.email = validText(data.email)? data.email : ''
    data.Password = validText(data.Password) ? data.Password : ''
    
    if(!Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }
    if(Validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    }
    if(Validator.isEmpty(data.Password)){
        errors.Password = " Password field is required";
    }
   return {
       errors,
       isvalid: Object.keys(errors).length===0
   }
}

