const mongoose = require ("mongoose")
const Schema = mongoose.Schema
const reviewSchema = new Schema({
  userId : {
    type : Schema.Types.ObjectId,
    ref : "User",
    required : [true,"a review must be provided"]
  },
  productId : { 
    type : Schema.Types.ObjectId,
    ref : "Product",
    required : [true,"a review must be provided"]
  },
  rating : { 
    type : Number,
    default : 3, 
    range : [3, 10],
    required : [true,"rating must be provided"]
},
message  : {
  type  : String,
  required : [true,"message must be provided"]
}
})

const Review = mongoose.model("Review",reviewSchema)
module.exports = Review