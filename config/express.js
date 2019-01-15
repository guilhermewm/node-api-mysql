var express = require('express');
var config = require('./config');
var morgan = require('morgan'); // Permite logs das requisições
var cors = require('cors'); // Permite Cross-origin resource sharing
var helmet = require('helmet'); // Permite um pouco de segurança a aplicaçãoo
var bodyParser = require('body-parser'); // Permite manipular mais facil as requisições
var methodOverride = require('method-override'); // Permite utilizar PUT, DELETE, POST em lugares onde o cliente n�o os suportam.

var app = express();
const SixMonths = 15778476000;

function initMiddleware(app) {
    // Mostrando stack erros
    app.set('showStackError', true);

    // Permite jsonp
    app.enable('jsonp callback');
    if (config.environment === 'development') {
        // Permite logger (morgan)
        app.use(morgan('dev'));

        // Desabilita views cache
        app.set('view cache', false);
    } else if (config.environment === 'production') {
        app.locals.cache = 'memory';
    }

        // Algumas configuraçoes do bodyParser
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); // Compreende urlencoded
    app.use(bodyParser.json({ limit: '50mb' })); // Compreende json 
    app.use(methodOverride());
}

function initHelmetHeaders(app) {
    app.use(helmet.frameguard()); // Impede clickjacking
    app.use(helmet.xssFilter());  // Adiciona algumas pequenas proteções XSS
    app.use(helmet.noSniff());    // Impedir que os clients vejam os topos MINE
    app.use(helmet.ieNoOpen());   // Seta as opçõeses de X-Download para o IE8+
    app.use(helmet.hsts({         // HTTP segurança de transporte estrito  
      "maxAge": SixMonths,
      "includeSubdomains": true,
      "force": true
    }));
    app.disable("x-powered-by");
}

function initCrossDomain(app) {
    app.use(cors());
    app.use(function(req, res, next) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });
}

function initRoutes(app) {
   app.use('', require('./routes'));
}

function init() {
    var app = express();
    initMiddleware(app);
    initHelmetHeaders(app);
    initCrossDomain(app);
    initRoutes(app);
    return app;
}

module.exports.init = init;