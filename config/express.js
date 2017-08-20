var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function() {
    var app = express();
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    //SERVE PARA OBTER FORMULARIOS COM O BODY DA REQUEST DE FORMA SIMPLES (BODY-PARSER)
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    //SERVE PARA REALIZAR VALIDACOES DOS CAMPOS DO BODY DA REQUISICAO DE FORM
    app.use(expressValidator());

    app.use(express.static('./app/public'));

    //UTILIZANDO O EXPRESS-LOAD FACILITA A IMPORTACAO DE MODULOS NO PROJETO
    //TIRANDO NECESSIDADE DE DIVERSON REQUIRES
    load('routes', { cwd: 'app' })
        .then('infra')
        .into(app)
    return app;
};