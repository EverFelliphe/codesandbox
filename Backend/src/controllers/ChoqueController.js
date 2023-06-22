const Choque = require('../models/Choque')
const fs = require("fs");
const { parse } = require("csv-parse");
const {resolve} = require('path');
const multer = require('multer');
const sqlite = require('sqlite3').verbose()
const csv = require('csv-parser');
const {tratar_csv} = require('../services/csv')
const upload = multer({ fileFilter:(req,file,cb) =>{
  
    if(file.mimetype !== 'text/csv'){ // se o arquivo não for csv
      return cb(new multer.MulterError('arquivo precisa ser csv')) // retorna um erro
    }
    return cb(null,true) // se for csv retorna o arquivo
  }}).single('file') // nome do campo que vai receber o arquivo
const { Console } = require('console'); 
var DBPATH = resolve(__dirname,'..','database','BANCO DE DADOS ATUALIZADO.bd');
//classe que controla as ações relacionadas aos choques
class ChoquesController{ //classe que controla as ações relacionadas aos choques
    //cria os choques a partir de um csv enviado na requisição
    
    
    async create_choque(req,res){ //cria os choques a partir de um csv enviado na requisição
        upload(req,res,async function (err){ //função que faz o upload do arquivo
            if(err){ // se houver erro
                return res.status(400).json({ // retorna um erro
                    errors:[err.code]
                  })
            }
            if (req.file) {
            
                // O arquivo foi recebido com sucesso
                // Processar o arquivo aqui
                // ...
                console.log(req.file)
                
                const dados = await tratar_csv(req.file,['Data_Hora','Latitude','Longitude','Velocidade','Position','Placa_Virtual','Trecho','F_max','ACT','PEG'])
                const choques = await Choque.CreateChoque(2,dados,4,'F')
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
           
            if(!choque1[0]){ //se não houver choques
                return res.json({msg:'choque inexistente'}) //retorna um erro
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
             if(!user){ //se não houver choques
                return res.json({msg:'error'}) //retorna um erro
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