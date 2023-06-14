
const Login = require('../models/login')
//classe que controla as ações do login
class LoginController{
    //verifica se o login recebido é valido ou não
     async login(req,res){
     res.header("Access-Control-Allow-Origin", "*");
     var user = req.body.usuario;
     var password = parseInt(req.body.senha);
     console.log(typeof(user),typeof(password))
     const data =  await Login.verify(user)
     
     if(data.length===0){ 
        console.log('entrou')
        return res.json({
        msg:'usuario não existe'
     })}
        const {usuario,senha}=data[0]
        if(usuario !== user) return res.json({
            msg:'usuario incorreto ou senha incorretos'
        })
        if(senha !== password) return res.json({
            msg:'usuario incorreto ou senha incorretos'
        })
        res.json({
        msg:'success',
        id:data[0].id
        })
     

}
}
module.exports = new LoginController