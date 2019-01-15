const config   = require('./config');
const mysql      = require('mysql');

var connection;
var connect = {};
connect.criaConexaoMySQL = criaConexaoMySQL;

function criaConexaoMySQL(cb) {    
    connection = mysql.createConnection(config.mySQL);    
    connection.on('connect', (res) => {
        if(cb && typeof(cb) === 'function') {cb();}
    })
    connection.connect(function(err){
        if(!err) {
            console.log("Banco conectado");
            connect.connection = connection;
        } else {
            console.log("Erro ao conectar no banco");
            console.log(err)
        }
    });
}
module.exports = connect;