const multer = require('multer') // biblioteca para upload de arquivos
exports.multerconfig = { // configuração do multer
    fileFilter:(req,file,cb) =>{ // função para filtrar os arquivos
  
        if(file.mimetype !== 'text/csv'){ // se o arquivo não for csv
          return cb(new multer.MulterError('arquivo precisa ser csv')) // retorna um erro
        }
        return cb(null,true) // se for csv retorna o arquivo
      }
    }