const {Router} = require('express')
const routes = Router();
const PicosController = require('./src/controllers/PicosController')
const LoginController = require('./src/controllers/LoginController')
const ChoquesController = require('./src/controllers/choqueController')
const UserController = require('./src/controllers/UserController') 
const RelatorioController = require('./src/controllers/relatoriosController') 
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
routes.get('/mapData/choque/f1', (req, res) => { // Endpoint para selecioanr F_max e data a partir de um query
    res.statusCode = 200;
    console.log(req.query.id_viagem)
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT F_max, id_viagem, Data_Hora, Velocidade, tipo FROM choques WHERE F_max BETWEEN ${req.query.sliderF1} AND ${req.query.sliderF2} AND tipo = 1 AND id_viagem=${req.query.id_viagem}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        } else { 
            res.json(rows)
        } 
    });
    db.close();
});

routes.get('/mapData/choque/f2', (req, res) => { // Endpoint para selecioanr F_max e data a partir de um query
    res.statusCode = 200;
    console.log(req.query.sliderF11)
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT F_max, id_viagem, Data_Hora, Velocidade, tipo FROM choques WHERE F_max BETWEEN ${req.query.sliderF11} AND ${req.query.sliderF22} AND tipo = 2 AND id_viagem=${req.query.id_viagem}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        } else {
            res.json(rows)
        }
    });
    db.close();
});
routes.post('/testeenvio',(req,res)=>{ // Endpoint testar envio nova pasta salvos
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH);
    console.log(req.body)
    var sql = `insert into salvos(id_user,tipo,id_item,pasta,id_rel) values(${req.body.id_user},"${req.body.tipo}",${req.body.id_item},"${req.body.pasta}",${req.body.id_rel})`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err; 
        }
        res.json('success');
    });
    db.close();
})
// Endpoints **PROJETO
routes.get('/listsalvos', (req, res) => { // Endpoint listar pastas salvas
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    console.log(req.query.user)
    var sql = `SELECT * FROM pastas WHERE id_user=${req.query.user}`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});
routes.get('/verificarsalvo', (req, res) => { // Endpoint verificar se item já foi salvo
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    console.log(req.query)
    var sql = `SELECT * FROM salvos WHERE id_item=${req.query.id_item} and tipo = "${req.query.tipo}"`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err; 
        }
        res.json(rows);
    });
    db.close();
}); 
routes.get('/items', (req, res) => { // Endpoint listar itens salvos
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    console.log(req.query)  
    var sql = `SELECT * FROM salvos WHERE id_user=${req.query.user} and pasta = "${req.query.pasta}"`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err; 
        }
        res.json(rows);
    }); 
    db.close();
});
routes.post('/criarpasta', (req, res) => { // Endpoint criar pasta salvos
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    console.log(req.body)
    var sql = `insert into pastas(id_user,pasta) values(${req.body.user},"${req.body.pasta}")`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err; 
        }
        res.json('success');
    });
    db.close();
});
routes.get('/projeto/vagao', (req,res) => { // Endpoint para listar vagões
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM Vagao WHERE id=${req.query.id}`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows)
    });
    db.close();
});

routes.get('/filtro',function(req,res){ // Endpoint para filtrar choques
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req.query)
    const column = req.query.column
    const filtro = req.query.filtro
    const id_vagao=req.query.viagem
    const tipo = req.query.tipo
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM choques WHERE id_viagem=${id_vagao} and tipo =${tipo} and ${column}="${filtro}" order by Data_Hora Asc`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows)
    });
    db.close();
})
//endpoint da viagem
routes.get('/projeto/viagem', (req, res) => { // Endpoint para listar viagens
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    console.log(req.body.id_viagem)
    var sql = `SELECT * FROM Viagem WHERE id_viagem=${req.body.id_viagem}`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});
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
routes.get('/projetos/viagens', (req, res) => { // Endpoint para listar viagens
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM viagens WHERE id_rel=${req.query.id_rel}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        };
        res.json(rows);
    });
    db.close();
});
//endpoint para a listagem de relatórios
routes.get('/projeto/relatorio', RelatorioController.show_relatorios );
//endpoints para as viagens
routes.get('/projetos/salvos', (req, res) => { // Endpoint para listar viagens de acordo com id
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM viagem WHERE id=${req.body.id}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        };
        res.json(rows);
    });
    db.close();
});
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