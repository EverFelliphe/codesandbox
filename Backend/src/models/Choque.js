var {resolve} = require('path')
const sqlite3 = require('sqlite3').verbose()
var DBPATH = resolve(__dirname,'..','database','BANCO DE DADOS ATUALIZADO.db');
//classe que se comunica com o banco de dados d tabela choque

class Choque{ // classe que se comunica com o banco de dados da tabela choque
    cria_tabela(atributos){ // cria a tabela choque
        return new Promise((resolve,reject)=>{
    
            var sql = `SELECT * FROM choques  WHERE id_viagem=${id_vagao} and tipo_choque =${tipo} order by Data_Hora Asc`
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
        
};
     findChoques(tipo,id_vagao){ // mostra os choques de um vagão e de um tipo
        return new Promise((resolve,reject)=>{
            console.log(tipo,id_vagao)
            var sql = `SELECT * FROM choques  WHERE id_viagem=${id_vagao} and tipo =${tipo} order by Data_Hora Asc`
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
        
};
show_All(id_vagao){ // mostra todos os choques de um vagão
    return new Promise((resolve,reject)=>{

        var sql = `SELECT * FROM choque  WHERE id_vagao=${id_vagao} `
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
    deletarChoque(id){ // deleta um choque
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
    CreateChoque(tipo,obj,viagem,engate,tabela){ // cria um choque
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database(DBPATH);
            obj.forEach(value =>{
                value.id_viagem = viagem
                value.tipo = tipo
                value.engate = engate
            })
            console.log(obj)
            let keys =[]
            for(let i =0; i<1; i++){
                Object.keys(obj[0]).forEach((value)=>{
                keys.push(value)
            }) 
            }
            obj.forEach((value,index)=>{ // percorre o objeto
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
                        var sql = `INSERT into choques(${keys.join(',')}) values(${map.join(',')})`
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