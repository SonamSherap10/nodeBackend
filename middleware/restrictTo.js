// ...roles converts the coming arguments into array
const restrictTo = (...roles)=>{
    return (req,res,next)=>{
    const userRole = req.user.role
    if (!roles.includes(userRole)){
      res.status(403).json({
        message : "You don't have the permission to do this"
      })
    }else{
      next()
    }  
  }
}
module.exports = restrictTo