var {resolve} = require('path')
const sqlite3 = require('sqlite3').verbose()
var DBPATH = resolve(__dirname,'..','database','banco_de_dados_ipt_grupo02.db');
//classe que controla as ações relacioandas aos relatórios
class RelatorioController{
    show_relatorios(req, res){
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*');
        var db = new sqlite3.Database(DBPATH);
        var sql = `SELECT id FROM relatorio where id_empresa=${req.query.id_empresa}`;
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