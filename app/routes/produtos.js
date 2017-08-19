module.exports = function(app) {
    //ROTA DO EXPRESS DE PRODUTOS
    app.get('/produtos', function(req, res) {

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.produtosDAO(connection);

        produtosDAO.lista(function(err, results) {

            //ENVIA UM JSON COM OS RESULTADOS DA QUERY
            //res.send(results);

            //ENVIAR O JSON PARA DENTRO DO TEMPLATE HTML TRATAR JA REDIRECIONANDO
            res.render('produtos/lista', { lista: results });
        });
        connection.end();
    });

    app.get("/produtos/form", function(req, res) {
        res.render('produtos/form');
    });

    app.post('/produtos/salva', function(req, res) {
        var produto = req.body;
        console.log(produto);

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.produtosDAO(connection);

        produtosDAO.salva(produto, function(erros, resultado) {
            res.redirect("/produtos");
        })
    })
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