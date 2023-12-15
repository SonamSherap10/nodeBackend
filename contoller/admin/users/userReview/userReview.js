const Product = require ("../../../../Model/productModel")
const Review = require("../../../../Model/userModel") 


exports.createReview = async (req, res) => {
  const userId = req.user.id
  const { rating, message } = req.body
  const productId =  req.params.id
   
  if (!userId || !rating || !message || !productId) {
    return res.status(400).json({
      message: "Please fill the required fields" 
    })
  } 

  const productFound = await Product.findById(productId) 
  if (!productFound) {
    return res.status(404).json({
      message: "Product with that id not found",
    })
  }

  const reviewFound =await Review.find({userId})
  const filteredReviews = reviewFound.filter(reviewFound => reviewFound.productId == productId)
  
  //check if the user has already submitted a review for the product
  if(filteredReviews.length > 0 ){
    return res.status(400).json({
      message :"You have already reviwed this product "
    })
  }

  await Review.create({
    userId,
    productId,
    rating, 
    message,     
  }) 

  res.status(200).json({
    message: "Review added successfully",
  })
}

exports.getReview = async (req,res)=>{
  const userId = req.user.id
  const review = await Review.find({userId})
  if(review.length ==0 ){
    return res.status(404).json({
      message : "you havent posted a review yet"
    })
  }
  res.status(200).json({
    message :"review has been fetched sucessfully",
    data : review
  })
}

exports.deleteReview = async(req,res)=>{
  const userId = req.user.id
  const reviewId = req.params.id

  const review = await Review.findById(reviewId)
  const OriginalReviewerId = review.userId 

  if(userId != OriginalReviewerId){
    return res.status(400).json({
      message : "you dont have permisson to do this"
    })
  }

  const deletereview = await Review.findByIdAndDelete(reviewId)
  return res.status(200).json({ 
    message :"review deleted sucessfully"
  })
}  