const usuarioService = require('./usuarios.service');
const md5 = require('md5');

var controller = {};
controller.registraUsuario = registraUsuario;
controller.login = login;
controller.logout = logout;
module.exports = controller;

function registraUsuario(req,res){
  let usuario = {
    "email": req.body.email,
    "nome": req.body.nome,
    "senha": md5(req.body.senha)
  }
  usuarioService.registraUsuario(usuario, response => {
    res.status(response.status);
    res.json(response);
  })    
}

function login(req, res){
  let usuario = {
    "email": req.body.email,
    "senha": md5(req.body.senha)
  }
  console.log(usuario)
  usuarioService.login(usuario, response => {
    res.status(response.status);
    res.json(response);
  })
}

function logout(req, res){
  usuarioService.logout(req.params.id_usuario, response => {
    res.status(response.status);
    res.json(response);
  })
}