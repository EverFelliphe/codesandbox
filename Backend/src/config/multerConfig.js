const multer = require('multer')
exports.multerconfig = {
    fileFilter:(req,file,cb) =>{
  
        if(file.mimetype !== 'text/csv'){
          return cb(new multer.MulterError('arquivo precisa ser csv'))
        }
        return cb(null,true)
      }
    }