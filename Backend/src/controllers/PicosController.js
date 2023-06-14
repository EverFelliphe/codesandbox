const Picos = require('../models/Picos')
const multer = require('multer');
const upload = multer({ fileFilter:(req,file,cb) =>{
  
    if(file.mimetype !== 'text/csv'){
      return cb(new multer.MulterError('arquivo precisa ser csv'))
    }
    return cb(null,true)
  }}).single('file')
  const {tratar_csv} = require('../services/csv')

class PicosController{
    async Show_Pico(req,res){
        
        try{
            res.header("Access-Control-Allow-Origin", "*");
            const{id_vagao} = req.query
            const pico = await Picos.findPicos(id_vagao)
            if(!pico[0]){
                return res.json({msg:'pico inexistente'})
            }
            return res.json(pico)
        }catch(error){
            return res.json({error:error})
        }
        
    
    }
   
    async create_picos(req,res){
        upload(req,res,async function (err){
            if(err){
                return res.status(400).json({
                    errors:[err.code]
                  })
            }
            if (req.file) {
        
                console.log(req.file)
                
                const dados = await tratar_csv(req.file,['Data_Hora','Latitude','Longitude','Velocidade','Position','Placa_Virtual','Trecho','Engate','Delta_T','ACT','PEG'])
                const choques = await Picos.CreatePicos(req.body.tipo,req.body.id,dados,'choque')
                
               res.send(choques)
              } else {  
                res.send('Nenhum arquivo enviado.');
              }
        })
        
    }
    async delete_Pico(req,res){

    }
    async update_Pico(req,res){

}
}
module.exports = new PicosController