var app = require('./config/express')();

//INICIALIZANDO UM SERVIDOR NA PORTA 3000
app.listen(3000, function() {
    console.log('servidor rodando');
});