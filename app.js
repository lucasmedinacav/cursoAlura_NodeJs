var app = require('./config/express')();

//INICIALIZACAO DO SOCKET IO
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.set('io', io);


//INICIALIZANDO UM SERVIDOR NA PORTA 3000
/*app.listen(3000, function() {
    console.log('servidor rodando');
});*/

//DESSE JEITO FUNCIONOU O SOCKET (HTTP SERVER AO INVES DO APP)
var porta = process.env.PORT || 3000;
var server = http.listen(porta, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});