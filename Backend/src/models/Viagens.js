var {resolve} = require('path')
const sqlite3 = require('sqlite3').verbose()
var DBPATH = resolve(__dirname,'..','database','BANCO DE DADOS ATUALIZADO.db');

class Viagens{
    findViagens(id_rel){
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database(DBPATH);
        var sql = `SELECT * FROM viagens WHERE id_rel=${id_rel}`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            };
            resolve(rows);
        });
        db.close();
    }
        )
    }
}


module.exports = new Viagens