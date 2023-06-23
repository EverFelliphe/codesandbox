var {resolve} = require('path')
const sqlite3 = require('sqlite3').verbose()
var DBPATH = resolve(__dirname,'..','database','BANCO DE DADOS ATUALIZADO.db');

class Salvos{
    salvar(id_user,tipo,id_item,pasta,id_rel){
        return new Promise((resolve,reject)=>{
             var db = new sqlite3.Database(DBPATH);
             var sql = `insert into salvos(id_user,tipo,id_item,pasta,id_rel) values(${id_user},"${tipo}",${id_item},"${pasta}",${id_rel})`
             db.all(sql, [], (err, rows) => {
                 if (err) {
                     throw err; 
                 }
                 resolve('success')
             });
             db.close();
        })
    }
    CriarPasta(user,pasta){
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database(DBPATH);
            var sql = `insert into pastas(id_user,pasta) values(${user},"${pasta}")`
            db.all(sql, [], (err, rows) => {
                if (err) {
                    throw err; 
                }
                resolve('success');
            });
            db.close();


        })
    }
    findPasta(user){
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM pastas WHERE id_user=${user}`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        resolve(rows);
    });
    db.close();
        })
    }
    findSalvo(id_item,tipo){
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM salvos WHERE id_item=${id_item} and tipo = "${tipo}"`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err; 
        }
        resolve(rows);
    });
    db.close();
        })
    }
    findItems(user,pasta){
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database(DBPATH);
        var sql = `SELECT * FROM salvos WHERE id_user=${user} and pasta = "${pasta}"`
        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err; 
            }
            resolve(rows);
        }); 
        db.close(); 
        })

       
    }
}

module.exports = new Salvos