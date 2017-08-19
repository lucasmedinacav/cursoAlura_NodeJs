module.exports = function(app) {
    //ROTA DO EXPRESS DE PRODUTOS
    app.get('/produtos', function(req, res) {
        console.log('passou');
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.produtosDAO(connection);

        produtosDAO.lista(function(err, results) {

            //ENVIA UM JSON COM OS RESULTADOS DA QUERY
            //res.send(results);

            //ENVIAR O JSON PARA DENTRO DO TEMPLATE HTML TRATAR JA REDIRECIONANDO
            //res.render('produtos/lista', { lista: results });

            //CONTENT NEGOTIATION - CONTROLA QUAL TIPO DE DADO
            //SERA ENVIADO CONFORME QUEM ESTA ESPERANDO SOLICITOU
            //PODE SERVIR COMO REDIRECIONAMENTO P UM PAGINA OU COMO UM METODO REST
            res.format({
                html: function() {
                    res.render("produtos/lista", { lista: results });
                },
                json: function() {
                    res.json(results);
                }
            });
        });
        connection.end();
    });

    app.get("/produtos/form", function(req, res) {
        res.render('produtos/form', {
            validationErrors: {},
            produto: {}
        });
    });

    app.post('/produtos', function(req, res) {
        var produto = req.body;
        console.log(produto);

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.produtosDAO(connection);

        //UTILIZADO EM CONJUNTO COM BODY PARSER
        //VERIFICA SE ALGUM CAMPO(NAME) ESTA INVALIDO
        //PRIMEIRO PARAMETRO NAME E SEGUNDO MENSAGEM DE ERRO
        req.assert('titulo', 'Titulo deve ser preenchido').notEmpty();
        req.assert('preco', 'Preco deve ser um numero').isFloat();
        //METODO QUE VERIFICA SE O BODY ESTA INVALIDO
        var errors = req.validationErrors();

        if (errors) {
            //ATUALIZA O FORM COM OS ERROS DE VALIDACAO 
            //E MANTEM CAMPOS PREENCHIDOS DO PRODUTO
            res.format({
                html: function() {
                    res.status(400).render("produtos/form", { validationErrors: errors, produto: produto });
                },
                json: function() {
                    res.status(400).send(errors);
                }
            });
            return;
        }

        produtosDAO.salva(produto, function(erros, resultado) {
            console.log(erros);
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