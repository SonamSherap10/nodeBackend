const Product = require("../../../../Model/productModel")
const User = require("../../../../Model/userModel")

exports.addToCart = async(req,res)=>{
  const {productId} = req.params 
  const userId = req.user.id
  if(!productId){
    return res.status(400).json({
      message : "please provide the product id"
    })
  }
  const productExist = await Product.findById(productId)
  if(!productExist){
    return res.status(400).json({
      message : "the product dosent exist"
    })
  }
 }

 sonam