var config = {};
config.environment = process.env.NODE_ENV || 'development';

// Configuração do Servidor
config.server = {
    host: process.env.IP || 'localhost',
    port: process.env.PORT || 3000
};

// MySQL configuração
config.mySQL = {
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'f_all'
};

config.key = {'secret': 'supersecret'}

// Exportar configura��es
module.exports = config;