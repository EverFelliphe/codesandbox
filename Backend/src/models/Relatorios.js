var {resolve} = require('path')
const sqlite3 = require('sqlite3').verbose()
var DBPATH = resolve(__dirname,'..','database','BANCO DE DADOS ATUALIZADO.db');

class Relatorios{
    findRel(id_empresa){
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT id_rel FROM relatorio where id_user=${id_empresa}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        };
        resolve(rows);
    });
    db.close();
        })
    }
    
}

module.exports = new Relatorios