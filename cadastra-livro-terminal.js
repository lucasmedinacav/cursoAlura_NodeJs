var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/produtos',
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
};

//REQUISICAO HTTP POST /PRODUTOS PERSISTINDO O PRODUTO
var client = http.request(configuracoes, function(res) {
    console.log(res.statusCode);
    res.on('data', function(body) {
        console.log('Corpo:' + body);
    });
});

//JSON A SER ENVIADO NA REQUISICAO PARA PERSISTENCIA
var produto = {
    titulo: 'mais sobre o node',
    descricao: 'node, javascript e um pouco de http',
    preco: 29.50
}

client.end(JSON.stringify(produto));