const {Router} = require('express')
const routes = Router();
const PicosController = require('./src/controllers/PicosController')
const LoginController = require('./src/controllers/LoginController')
const ChoquesController = require('./src/controllers/choqueController')
const UserController = require('./src/controllers/UserController') 
const RelatorioController = require('./src/controllers/relatoriosController') 
const salvosController = require('./src/controllers/salvosController') 
const viagensController = require('./src/controllers/viagensController') 

var {resolve} = require('path')
const sqlite3 = require('sqlite3').verbose()
var DBPATH = resolve(__dirname,'src','database','BANCO DE DADOS ATUALIZADO.db');

// Endpoints **REDIRECT
routes.get('/meus_projetos', (req, res) => {
    // Redirect para a página "Meus projetos"
    
    res.redirect(`/pagina_inicial.html?user_id=${req.query.user_id}`)
})
routes.get('/', (req, res) => {
    // Redirect para a página "login"
    res.redirect('/login.html')
})
routes.get('/relatorio', (req, res) => {

    // Redirect para a página "projeto"
    res.redirect(`/projeto.html?id_relatorio=${req.query.id_relatorio}&id_user=${req.query.id_user}`)
})

//endpoint da viagem

// Endpoints comparação
routes.get('/projeto/comparacao', (req, res) => { // Endpoint para listar choque, pico e vagao de um respectivo vagao
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM Choque, Pico, Vagao WHERE id_vagao=${req.body.id_vagao}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

//endpoints listar para as viagens

routes.get('/projetos/viagens', viagensController.listarViagens);
//endpoint para a listagem de relatórios
routes.get('/projeto/relatorio', RelatorioController.show_relatorios );

//endpoints para filtrar os choques baseado no engate

routes.get('/filtro',ChoquesController.filtrarChoque)
//endpoints listar para os choques de tipo1 dentro de um intervalo

routes.get('/mapData/choque/f1',ChoquesController.rangedChoque1);
//endpoints listar para os choques de tipo2 dentro de um intervalo

routes.get('/mapData/choque/f2',ChoquesController.rangedChoque2);
//endpoints para salvar um item dentro de uma pasta na bd

routes.post('/testeenvio',salvosController.salvarItem)
//endpoints listar as pastas de favoritos do usuario

routes.get('/listsalvos',salvosController.listPasta);
//endpoints para verificar se o item selecionado esta salvo 

routes.get('/verificarsalvo',salvosController.verificarSalvo); 
//endpoints para listar os items dentro de uma pasta

routes.get('/items', salvosController.itemsPasta);
//endpoints listar para criar uma pasta nova 

routes.post('/criarpasta', salvosController.adicionarpasta);


//endpoints do login
 routes.post("/login",LoginController.login );
 //endpoints dos usuarios
 routes.post("/criarUsuario",  UserController.criaUser);
 routes.put("/atualizaUsuario", UserController.updateUser);
 routes.delete("/deletarUsuario", UserController.deleteUser);
 routes.get("/todos", UserController.showAll);
 
 //endpoints dos choques
 routes.get("/choque1",ChoquesController.Show_choque);
 routes.get("/choque2",ChoquesController.Show_choque);
 routes.delete("/deletarChoque",ChoquesController.delete_choque );
 //endpoint do pico
 routes.get("/pico", PicosController.Show_Pico);
 


routes.get("/perfil", UserController.showUser);
//endpoints de teste para criação de choques
routes.post("/teste", ChoquesController.create_choque);
routes.post("/teste2", PicosController.create_picos);



module.exports = routes;