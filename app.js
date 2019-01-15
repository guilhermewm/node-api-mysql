var logger  = require('mm-node-logger')(module);
var pkg     = require('./package.json');
var config  = require('./config/config');
var express = require('./config/express');
var mySQL = require('./config/mySQL');

mySQL.criaConexaoMySQL(function iniciaServer() {
    var app = express.init();

    app.listen(config.server.port, function () {
        logger.info('Rodando...');
    });
});