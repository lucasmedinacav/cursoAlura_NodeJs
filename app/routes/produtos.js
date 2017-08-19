module.exports = function(app) {
    //ROTA DO EXPRESS DE PRODUTOS
    app.get('/produtos', function(req, res) {

        //SEND COSPE HTML NA RESPONSE
        //res.send('<html><body>Pagina de produtos</body></html>');

        //RENDER RENDERIZA UM HTML
        res.render('produtos/lista');
    });
}