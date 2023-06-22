var {resolve} = require('path')
const sqlite3 = require('sqlite3').verbose()
var DBPATH = resolve(__dirname,'..','database','BANCO DE DADOS ATUALIZADO.db');
//classe que controla as ações relacioandas aos relatórios
class RelatorioController{ // classe que controla as ações relacioandas aos relatórios
    show_relatorios(req, res){
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*');
        var db = new sqlite3.Database(DBPATH);
        var sql = `SELECT id_rel FROM relatorio where id_user=${req.query.id_empresa}`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            };
            res.json(rows);
        });
        db.close();
    }
}
module.exports= new RelatorioController