const constants = require('./usuarios.constants.json');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const mySql = require('../config/mySQL');

var service = {};
service.registraUsuario = registraUsuario;
service.login = login;
service.logout = logout;
module.exports = service;

function registraUsuario(usuario, callback){
	if(usuario){
		verificaSeUsuarioExiste(usuario.email).then(result => {
			if(!result){
				mySql.connection.query('INSERT INTO usuarios SET ?', usuario, (error, result, fields) => {
					if (error) {
						callback(constants.error.msg_bad_request);
					}else{
						callback(constants.success.msg_usuario_cadastrado);
					}
				});
			}else{
				callback(constants.error.msg_usuario_existente);
			}
		})
	}	
}

function verificaSeUsuarioExiste(email){
	return new Promise ((resolve, reject) =>{
		mySql.connection.query("SELECT COUNT(0) as quantidade FROM usuarios WHERE email = ?", email, (error, results, fields) => {
			let resultJson = JSON.stringify(results);
			resultJson = JSON.parse(resultJson);
			if(resultJson[0].quantidade > 0){
				resolve(true);
			}else{
				resolve(false); 
			}
		})
	})	
}

function login(usuario, callback){
	mySql.connection.query('SELECT * FROM usuarios WHERE email = ?',[usuario.email], function (error, results, fields) {
		if (error) {
			callback(constants.error.msg_bad_request);
		}else{
			if(results.length >0){
				if(results[0].senha == usuario.senha){
					let token = jwt.sign({ id: results[0].id }, config.key.secret, {
						expiresIn: 86400 // 24 horas
					});
					let saveToken = {
						"token": token,
						"id_usuario": results[0].id 
					}
					mySql.connection.query('DELETE FROM tokens WHERE id_usuario = ?', saveToken.id_usuario, (error, result, fields) => {
						if(error){
							callback(constants.error.msg_bad_request);
						}else{
							mySql.connection.query('INSERT INTO tokens SET ?', saveToken, (error, result, fields) => {
								if (error) {
									callback(constants.error.msg_bad_request);
								}
							});
						}
					})
					callback({"status": 200,"message" : {"result" : "success","message": "Usuário logado", "auth": true,"token": token}});
				}else{
					callback(constants.error.msg_email_e_senha);
				}
			}else{
				callback({"status": 204,"message" : {"result" : "success","message": "Email não cadastrado","auth": false,"token": null}});
			}
		}
	});
}

function logout(id_usuario, callback){
	mySql.connection.query('DELETE FROM tokens WHERE id_usuario = ?', id_usuario, (error, result, fields) => {
		if(error){
			callback(constants.error.msg_bad_request);
		}else{
			callback(constants.success.msg_deslogado);
		}
	})
}