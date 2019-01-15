var jwt = require('jsonwebtoken'); 
var config = require('./config'); 
const mySql = require('./mySQL');

function verificaToken(req, res, next) {

  var token = req.headers['x-access-token'];
  if (!token) 
    return res.status(403).send({"status": 403,"message" : {"result" : "error","message": "Nenhum token especificado", auth: false}});

    mySql.connection.query('SELECT * FROM tokens WHERE token = ?', token, (error, results, fields) => {
        if(error){
            return res.status(400).send({"status": 400,"message" : {"result" : "error","message": "Ocorreu um erro"}});
        }else{
            if(results.length >0){
                jwt.verify(token, config.key.secret, function(err, decoded) {      
                    if (err)         
                        return res.status(500).send({"status": 500,"message" : {"result" : "error","message": "Falha ao autenticar o token de login", auth: false}});   
                        req.userId = decoded.id;                        
                    next();
                });
            }else{
                res.status(400).send({"status": 400,"message" : {"result" : "error","message": "Falha ao autenticar o token de login"}});
            }            
        }
    })
}
module.exports = verificaToken;