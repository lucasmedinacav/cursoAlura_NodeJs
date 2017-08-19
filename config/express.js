var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

module.exports = function() {
    var app = express();
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    //SERVE PARA OBTER FORMULARIOS COM O BODY DA REQUEST DE FORMA SIMPLES (BODY-PARSER)
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    //UTILIZANDO O EXPRESS-LOAD FACILITA A IMPORTACAO DE MODULOS NO PROJETO
    //TIRANDO NECESSIDADE DE DIVERSON REQUIRES
    load('routes', { cwd: 'app' })
        .then('infra')
        .into(app)
    return app;
};