var {resolve} = require('path')
const sqlite3 = require('sqlite3').verbose()
var DBPATH = resolve(__dirname,'..','database','banco_de_dados_ipt_grupo02.db');
//classe que se comunica com o banco de dados a tabela picos

class Picos{
     findPicos(id_vagao){
        return new Promise((resolve,reject)=>{
    
            var sql = `SELECT * FROM pico  WHERE id_vagao=${id_vagao}  `
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
    CreatePicos(tipo,id_vagao,obj){
        
        return new Promise((resolve,reject)=>{
            
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
                             
                        if(index === obj.length-1){  
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
                        var sql = `INSERT into pico(${keys.join(',')}) values(${map.join(',')})`
                        console.log(sql,index)
                        console.log(obj.length-1)
                             db.all(sql, [], (err, rows)=>
                            {
                                if(err){
                                   return  reject("Erro na gravação: "+ err);
                                    }

                                         resolve({msg:'foi'})
                                         db.close()
                                    
                                   
                            })}else{
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
                        var sql = `INSERT into pico(${keys.join(',')}) values(${map.join(',')})`
                        console.log(sql,index)
                        console.log(obj.length-1)
                                  db.all(sql, [], (err, rows)=>
                            { 
                                if(err)
                                {
                                    reject("Erro na gravação: "+err);
                                    }
                            });
                        }
                       
                        
        })
                      
                        
            })
    }
}
module.exports = new Picos