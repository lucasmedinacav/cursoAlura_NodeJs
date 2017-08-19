var connectionFactory = require('../infra/connectionFactory');

module.exports = function(app) {
    //ROTA DO EXPRESS DE PRODUTOS
    app.get('/produtos', function(req, res) {

        var connection = connectionFactory();

        connection.query('select * from produtos', function(err, results) {
            console.log(results);
            //ENVIA UM JSON COM OS RESULTADOS DA QUERY
            //res.send(results);

            //ENVIAR O JSON PARA DENTRO DO TEMPLATE HTML TRATAR JA REDIRECIONANDO
            res.render('produtos/lista', { lista: results });
        });

        connection.end();
    });
}


/*module.exports = function(app) {
    //ROTA DO EXPRESS DE PRODUTOS
    app.get('/produtos', function(req, res) {
        //SEND COSPE HTML NA RESPONSE
        //res.send('<html><body>Pagina de produtos</body></html>');

        //RENDER RENDERIZA UM HTML
        res.render('produtos/lista');

    });
}*/