
var express = require('express');
var router = express.Router();
var usuarioController = require('../usuarios/usuarios.controller');
var filmesController = require('../filmes/filmes.controller');
var verificaToken = require('./verificaToken');

router.get('/',function(req, res){
    res.send("API em funcionamento");
})

router.post('/registrar', usuarioController.registraUsuario);
router.post('/login', usuarioController.login);
router.get('/logout/:id_usuario', verificaToken, usuarioController.logout);

router.get('/filmes', verificaToken, filmesController.getTodosOsFilmes);
router.get('/filmes/:titulo', verificaToken, filmesController.getFilmePeloTitulo);
router.post('/locarFilme', verificaToken, filmesController.registrarLocacao);
router.post('/devolverFilme', verificaToken, filmesController.devolverFilme);

module.exports = router;
