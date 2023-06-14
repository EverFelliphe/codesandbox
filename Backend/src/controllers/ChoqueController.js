const Choque = require('../models/Choque')
const fs = require("fs");
const { parse } = require("csv-parse");
const {resolve} = require('path');
const multer = require('multer');
const sqlite = require('sqlite3').verbose()
const csv = require('csv-parser');
const {tratar_csv} = require('../services/csv')
const upload = multer({ fileFilter:(req,file,cb) =>{
  
    if(file.mimetype !== 'text/csv'){
      return cb(new multer.MulterError('arquivo precisa ser csv'))
    }
    return cb(null,true)
  }}).single('file')
const { Console } = require('console');
var DBPATH = resolve(__dirname,'..','database','banco_de_dados_ipt_grupo02.db');
//classe que controla as ações relacionadas aos choques
class ChoquesController{
    //cria os choques a partir de um csv enviado na requisição
    async create_choque(req,res){
        upload(req,res,async function (err){
            if(err){
                return res.status(400).json({
                    errors:[err.code]
                  })
            }
            if (req.file) {
            
                // O arquivo foi recebido com sucesso
                // Processar o arquivo aqui
                // ...
                console.log(req.file)
                
                const dados = await tratar_csv(req.file,['Data_Hora','Latitude','Longitude','Velocidade','Position','Placa_Virtual','Trecho','F_max','ACT','PEG'])
                const choques = await Choque.CreateChoque(req.body.tipo,req.body.id,dados,'choque')
                console.log(dados)
                console.log(choques)
                console.log(req.body)
               res.send(choques)
              } else {  
                // Nenhum arquivo foi recebido
                res.send('Nenhum arquivo enviado.');
              }
        })
        
    }
    //mostra os choques de um vagão e de um tipo
    async Show_choque(req,res){
        
        try{
            res.header("Access-Control-Allow-Origin", "*");
            const{id_vagao,tipo} = req.query 
            console.log(tipo)
            const choque1 = await Choque.findChoques(tipo,id_vagao)
           
            if(!choque1[0]){
                return res.json({msg:'choque inexistente'})
            }
            return res.json(choque1)
        }catch(error){
            return res.json({error:error})
        }
        
    
    }
    //deleta um choque
    async delete_choque(req,res){
        res.header("Access-Control-Allow_Origin", "*");
        var id = req.body.id;
        try{
             const user = await Choque.deletarChoque(id)
             if(!user){
                return res.json({msg:'error'})
             }
             return res.json({msg:user})
        }catch(e){
            console.log(e)
        }
       

    }
    async update_choque(req,res){

}
}
module.exports = new ChoquesController