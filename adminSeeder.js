const User = require("./Model/dbmodel") 

const bcrypt = require("bcryptjs")

const adminSeeder = async()=>{

  const isAdminExists = await User.findOne({userEmail : "admin@gmail.com"})

 if(!isAdminExists){
   await User.create({
      userName : "admin",
      userPhone : "98123232",
      userEmail : "admin@gmail.com",
      userPassword : bcrypt.hashSync(process.env.ADMIN_PASS,10),
      role : "Admin"
    })
  }else{
   console.log("admin has already been seeded")  
  } 
}

module.exports = adminSeeder