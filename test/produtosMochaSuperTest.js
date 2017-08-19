var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutosController', function() {

    beforeEach(function(done) {
        var connection = express.infra.connectionFactory();
        connection.query("delete from produtos", function(ex, result) {
            if (!ex) {
                done();
            }
        });
    });

    it('#listagem json', function(done) {

        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('#cadastro de um novo produto com dados invalidos', function(done) {
        request.post('/produtos')
            .send({ titulo: "", descricao: "livro de teste" })
            .expect(400, done)

    });

    it('#cadastro de um novo produto com tudo preenchido', function(done) {
        request.post('/produtos')
            .send({ titulo: "novo livro", preco: 20.50, descricao: "livro de teste" })
            .expect(302, done)
    });
});