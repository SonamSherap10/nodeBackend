const user = require("../../../Model/dbmodel")

exports.getUsers = async(req,res)=>{
  const userId = req.user.id
  const users = await user.find({_id : {$ne : userId}}).select(["+otp","+isOtpVerified"])
  if(users.length > 1){
     return res.status(200).json({
          message : "Users fetched successfully",
          data  : users
      })
  }
      res.status(404).json({
          message : "User Collection is empty",
          data  : []
      })
}

exports.deleteUser = async(req,res)=>{ 
const {id} = req.params
if(!id){
  return  res.status(400).json({ 
        message : "please send id"
    })
}
const User = await user.findById(id)
if(!User){
    res.status(404).json({
        message : "User not found with that userid"
    })
}else{
    await user.findByIdAndDelete(id)
    res.status(200).json({
        message : "User deleted successfully"
    })
}
}