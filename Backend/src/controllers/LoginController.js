
const Login = require('../models/Login')
//classe que controla as ações do login
class LoginController{
    //verifica se o login recebido é valido ou não
     async login(req,res){
     res.header("Access-Control-Allow-Origin", "*");
     var userf = req.body.usuario;
     var password = parseInt(req.body.senha);
     console.log(typeof(userf),typeof(password))
     const data =  await Login.verify(userf)
     console.log(password)
     if(data.length===0){  // se não houver usuario
        console.log('entrou')
        return res.json({ // retorna um erro
        msg:'usuario não existe'
     })}
        const {user,senha}=data[0]
        console.log(user)
        if(user !== userf) return res.json({ // se o usuario for diferente do usuario recebido
            msg:'usuario incorreto ou senha incorretos'
        }) 
        if(Number(senha) !== password) return res.json({ // se a senha for diferente da senha recebida
            msg:'usuario incorreto ou senha incorretos'
        })
        res.json({
        msg:'success',
        id:data[0].id
        })
     

}
}
module.exports = new LoginController