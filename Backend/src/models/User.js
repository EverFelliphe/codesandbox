var {resolve} = require('path')
const sqlite3 = require('sqlite3').verbose()
var DBPATH = resolve(__dirname,'..','database','banco_de_dados_ipt_grupo02.db');
//classe que se comunica com o banco de dados a tabela user

class User{

    findAll(){
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database(DBPATH);
            db.all(`SELECT * FROM user`, [], (err, rows)=>
            {
                if(err)
                {
                    reject(err);
                }
                resolve(rows);
            });
            db.close()
        })

    }
    showUser(id){
        return new Promise((resolve,reject)=>{
            var sql = `SELECT * FROM user WHERE id="${id}"`
            var db = new sqlite3.Database(DBPATH);
            db.all(sql, [], (err, rows)=>
            {
                if(err)
                {
                    res.send("Usuário não encontrado"+err);
                }
                else {
                    resolve(rows);
                }
                
            });
            db.close() 
        })
        
    }
    store(dados){
        return new Promise((resolve,reject)=>{
            var sql = `INSERT INTO user (usuario,senha,empresa,email) VALUES ("${dados.usuario}",${dados.senha},"${dados.empresa}","${dados.email}")`
            var db = new sqlite3.Database(DBPATH);
            db.all(sql, [], (err, rows)=>
            {
                if(err){
                    reject("Erro na gravação: "+err);
                }
                
                    resolve({msg:"Usuário cadastrado!"});
                
            });
            db.close()
                })
    }
    updateUser(user){
        return new Promise((resolve,reject)=>{
            var sql = `UPDATE user SET usuario="${usuario}", senha="${user.senha}",empresa="${user.empresa}",email="${user.email}" WHERE id=${user.id}`
            var db = new sqlite3.Database(DBPATH);
            db.all(sql, [], (err, rows)=>
            {
                if(err)
                {
                    reject("Erro na atualização: "+err);
                }
                resolve("Usuário atualizado!");
                
            });
            db.close()
        })
    }
    deleteUser(id){
        return new Promise((resolve,reject)=>{
            var sql = `DELETE FROM user WHERE id=${id}`
            var db = new sqlite3.Database(DBPATH)
            db.all(sql, [], (err, rows)=>
            {
                if(err)
                {
                    reject("Erro na delecao: "+err);
                }else
                {
                    resolve("Usuário Deletado!");
                }
            });
            db.close()
                })
    }
}
module.exports= new User