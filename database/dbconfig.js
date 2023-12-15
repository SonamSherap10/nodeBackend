const mongoose = require('mongoose')
const adminSeeder = require('../adminSeeder')


exports.connectdb = async (URI)=>{
 await mongoose.connect(URI)
  console.log("database connected")
  adminSeeder()
}