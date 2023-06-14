var express = require("express");
var app = express();
var bodyParser= require('body-parser')
var {resolve} = require('path')
const routes = require('./routes')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(resolve(__dirname,'..','Frontend')));//configuração do diretório estatico do servidor
app.use(routes);
//arquivo de configuração do  express

module.exports = app