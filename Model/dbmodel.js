const mongoose = require("mongoose")

const dataschema = new mongoose.Schema({
userName: {
type : String,
require : [true,"name must be provided"]
},
userEmail:{
  type : String,
  require : [true ,"email must be provided"]
},
userPhone:{
  type : Number
},
userPassword : {
  type  : String,
  require : [true,"password must be provided"]
},
role : {
  type  : String,
  enum:  ["Customer","Admin"],
  default : "Customer"
},
otp:{
  type : Number
},
isotpverified:{
  type : Boolean,
  default : false
}
})

const User = mongoose.model("User", dataschema)
module.exports = User