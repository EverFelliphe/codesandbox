var {resolve} = require('path')
const sqlite3 = require('sqlite3').verbose()
var DBPATH = resolve(__dirname,'..','database','banco_de_dados_ipt_grupo02.db');
//classe que se comunica com o banco de dados d tabela user
class Login {
    //busca o usuario baseado numa pk enviada e retorna uma promisse contendo ela
    async verify(Pk){
        return new Promise((resolve,reject)=>{
          var sql =`SELECT * FROM user WHERE usuario="${Pk}"`
          console.log(Pk)
            var db = new sqlite3.Database(DBPATH);
            let dados = {}
            db.all(sql,[],function(err,row){
                if(err)
                {
                    reject("algo deu errado" + err)
                }
                
                resolve(row)
                db.close()  
            });
            
        })

    }
}
module.exports = new Login