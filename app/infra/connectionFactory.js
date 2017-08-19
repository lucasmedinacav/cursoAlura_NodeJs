var mysql = require('mysql');

module.exports = function() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin123',
        database: 'casadocodigo_nodejs'
    })
};