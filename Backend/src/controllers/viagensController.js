const Viagens = require('../models/Viagens')
//classe que controla as ações do viagens
class ViagensController{
    async listarViagens(req,res){
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*');
        let viagens = await Viagens.findViagens(req.query.id_rel)
        res.json(viagens)
    }
}
module.exports= new ViagensController