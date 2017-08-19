var express = require('express');
var load = require('express-load');

module.exports = function() {
    var app = express();
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    //UTILIZANDO O EXPRESS-LOAD FACILITA A IMPORTACAO DE MODULOS NO PROJETO
    //TIRANDO NECESSIDADE DE DIVERSON REQUIRES
    load('routes', { cwd: 'app' })
        .then('infra')
        .into(app)
    return app;
};