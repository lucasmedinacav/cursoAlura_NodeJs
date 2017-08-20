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

    //QUALQUER TEMPLATE PODE UTILIZAR ESSES ARQUIVOS(JS CSS IMG) ESTATICOS
    app.use(express.static('./app/public'));

    //UTILIZANDO O EXPRESS-LOAD FACILITA A IMPORTACAO DE MODULOS NO PROJETO
    //TIRANDO NECESSIDADE DE DIVERSON REQUIRES
    load('routes', { cwd: 'app', verbose: true })
        .then('infra')
        .into(app)

    app.use(function(req, res, next) {
        res.status(404).render("erros/404");
    });

    app.use(function(error, req, res, next) {
        if (process.env.NODE_ENV == 'production') {
            res.status(500).render('erros/500');
            return;
        }
        next(error);
    });
    return app;
};