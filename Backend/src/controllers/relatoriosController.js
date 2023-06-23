var {resolve} = require('path')
const Relatorios = require('../models/Relatorios')
const sqlite3 = require('sqlite3').verbose()
//classe que controla as ações relacioandas aos relatórios
class RelatorioController{ // classe que controla as ações relacioandas aos relatórios
    async show_relatorios(req, res){
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*');
        let relatorios = await Relatorios.findRel(req.query.id_empresa)
        res.json(relatorios)
    }
}
module.exports= new RelatorioController