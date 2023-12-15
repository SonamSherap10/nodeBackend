

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { JsonWebTokenError } = require("jsonwebtoken")
const User = require("../../Model/dbmodel")
const sendEmail = require("../../services/sendEmail")
const { INTEGER } = require("sequelize")

exports.registeruser = async(req,res)=>{
  const {email,password,phoneNumber,username} = req.body
  if(!email || !password || !phoneNumber || !username){
     return res.status(400).json({
          message : "Please provide email,password,phoneNumber"
      })
  }
 const userFound =  await User.find({userEmail : email})
  if(userFound.length > 0 ){
      return res.status(400).json({
          message : "User with that email already registered"
      })
  }
  await User.create({
      userName : username,
      userPhone : phoneNumber,
      userEmail : email,
      userPassword : bcrypt.hashSync(password,10)
  })

  res.status(201).json({
      message : "User registered successfully"
  })
}


exports.loginuser = async(req,res)=>{
  const {email,password} = req.body
if (!email||!password){
  return res.status(400).json({
    message : "please provide the needed data"
  })
}

const userfound =await User.find({userEmail : email})
if (userfound == 0){
 return res.status(404).json({
    message : "the user dosent exist"
  })
}
  const Password = bcrypt.compareSync(password,userfound[0].userPassword)
if (Password){
  const token = jwt.sign({id : userfound[0]._id},process.env.SECRET_KEY,{
    expiresIn : '30d'
   })


    res.status(200).json({
        message : "User logged in successfully",
       data :  token
    })
}else{
    res.status(404).json({
        message : "Invalid Password"
    })
}
}

exports.forgotpassword = async(req,res)=>{
  const {email} = req.body
 if (!email){
  return res.status(400).json({
    message :"please provide email"
  })
 }
 //else
const userfound =await User.find({userEmail : email})
if (userfound.length == 1){
   const otp = Math.floor(Math.random() * 100000)

   userfound[0].otp = otp
   userfound[0].save()

    await sendEmail({
    email : email,
    subject : "Use this otp to reset your password",
    message :  `Your otp is ${otp}`
    })
    res.json({
      message: "email sent"
    })
  }else{
    res.status(404).json({
      message:"mail not found" 
    })
  }}


  exports.otpcheck = async(req,res)=>{
    const {email,otp} = req.body
    if(!email||!otp){
     return res.status(400).json({
        message :"please fill the required information"
      })
    }

    const userfound =await User.find({userEmail : email})

    if (userfound.length==0){
      return res.status(400).json({
        message:"the email is not valid"
      })
    }
    if (userfound[0].otp !== otp){
      res.status(400).json({
        message:"otp is not valid"
      })
    }else{
      res.status(200).json({
        message:"otp is valid you may rechange your password"
      })
     userfound[0].otp = undefined
     userfound[0].isotpverified = true
     userfound[0].save()
    }

  } 

  exports.resetpassword = async(req,res)=>{
    const {email,newpassword,confirmpassword} = req.body
    if (!email || !newpassword || !confirmpassword){
      return res.status(403).json({
        message:"please provide the needed informations"
      })
    }
    
    const userfound =await User.find({userEmail : email})
    
    if(userfound[0].isotpverified !== true){
      return res.status(400).json({
        message:"action cannot be performed"
      })
    }
    
    if(newpassword !== confirmpassword){
      return res.status(403).json({
        message :"the confirm password doesnt match with the new password"
      })
    }

    userfound[0].userPassword = bcrypt.hashSync(newpassword,10)
    userfound[0].isotpverified = false
    userfound[0].save()
    return res.status(200).json({
      message : "password changed succesfully"
    })
  } 