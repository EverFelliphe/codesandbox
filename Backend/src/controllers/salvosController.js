const Salvos = require('../models/salvos');

class salvosController{
    async salvarItem(req,res){ // Endpoint testar envio nova pasta salvos
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        
        console.log(req.body)
        let data = await Salvos.salvar(req.body.id_user,req.body.tipo,req.body.id_item,req.body.pasta,req.body.id_rel)
        res.json({msg:data})
    }
    async adicionarpasta(req,res){
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*');
        let criar = await Salvos.CriarPasta(req.body.user,req.body.pasta)
        res.json({msg:criar})
    }
    async listPasta(req,res){
        res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    let pastas = await Salvos.findPasta(req.query.user)
    res.json(pastas)
    }
    async verificarSalvo(req,res){
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*');
        let salvos = await Salvos.findSalvo(req.query.id_item,req.query.tipo)
        res.json(salvos)
    }
    async itemsPasta(req,res){ 
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*');
        let items = await salvos.findItems(req.query.user,req.query.pasta)
        res.json(items)
    }
}
module.exports= new salvosController