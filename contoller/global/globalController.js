const fs = require("fs")
const Product = require("../../Model/productModel")

exports.viewproducts = async(req,res)=>{
    const product =await Product.find()
    if (product.length == 0 ){
      res.status(500).json({
       message : "products not found",
      })
    }else{
      res.status(200).json({
       data : product,
        message : "products fetched"
      })}   
}

exports.viewProduct = async(req,res)=>{
  const {id} = req.params
  if(!id){
    return res.status(400).json({
      message :  "please provide id"
    })
  }

  const product =await Product.find({_id : id})
  if(product.length == 0){
    res.status(400).json({
        message : "No product found with that id",
      data : {  
        data : []
    }
    })
}else{
    res.status(200).json({
        message : "Product fetched successfully",
        data : { 
            product 
         }
    })
}
}

