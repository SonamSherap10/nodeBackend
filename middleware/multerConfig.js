const multer = require('multer')

const storage = multer.diskStorage({
  destination : function(req,file,cb){
   const allowedFileType = ['image/jpeg','image/png','image/jpg']

   if (!allowedFileType.includes(file.mimetype)){
    cb(new error("file type is not supported"))
    return
   }
   cb(null,'./files')
  },
  filename : function(req,file,cb){
    cb(null,Date.now()+"-"+file.originalname)
  }
})

module.exports = {
multer,
storage
}