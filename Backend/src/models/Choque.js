var {resolve} = require('path')
const sqlite3 = require('sqlite3').verbose()
var DBPATH = resolve(__dirname,'..','database','banco_de_dados_ipt_grupo02.db');
//classe que se comunica com o banco de dados d tabela choque

class Choque{
    
     findChoques(tipo,id_vagao){
        return new Promise((resolve,reject)=>{
    
            var sql = `SELECT * FROM choque  WHERE id_vagao=${id_vagao} and tipo_choque =${tipo} `
            var db = new sqlite3.Database(DBPATH);
            db.all(sql, [], (err, rows)=>
            {
                if(err)
                {
                    reject("identificação invalida");
                } 
                    resolve(rows)
                
            });
            db.close()
        }

        )
        
}
    updateChoque(id){
        
    }
    deletarChoque(id){
        return new Promise((resolve,reject)=>{
            var sql = `DELETE FROM choque WHERE id=${id}`
           
            db.all(sql, [], (err, rows)=>
            {
                if(err)
                {
                    reject("Erro na delecao: "+err);
                }
                
                    resolve(" Deletado!");
                
            });
            db.close()
        })
    }
    CreateChoque(tipo,id_vagao,obj,tabela){
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database(DBPATH);
            obj.forEach(value =>{
                value.id_vagao = id_vagao
                value.tipo_choque = tipo
            })
            console.log(obj)
            let keys =[]
            for(let i =0; i<1; i++){
                Object.keys(obj[0]).forEach((value)=>{
                keys.push(value)
            }) 
            }
            obj.forEach((value,index)=>{
                             var db = new sqlite3.Database(DBPATH);
                            let values = Object.values(value).map(value =>{
                            return value.toString().replace(',','.')
                        })
                            let map = values.map(value =>{
                            if(/[a-zA-Z]/.test(value)){
                                return `"${value}"`
                            }
                            return parseFloat(value)
                        })
                        console.log(map.join(','))
                        console.log(keys.join(','))
                        var sql = `INSERT into choque(${keys.join(',')}) values(${map.join(',')})`
                        console.log(sql,index)
                        db.all(sql, [], (err, rows)=>
                        {
                            if(err)
                            {
                                reject("Erro na gravação: "+err);
                                }
                                if(index === obj.length-1){
                                    db.close()
                                    return resolve({msg:' foi'})
                                }
                               
                        });
                        
        })
                      
                        
            })
           
            
    }
}
module.exports = new Choque