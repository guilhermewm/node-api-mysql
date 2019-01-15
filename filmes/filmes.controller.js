const express = require('express');
const filmesService = require('./filmes.service');
const constants = require('./filmes.constants');

var controller = {};
controller.getTodosOsFilmes = getTodosOsFilmes;
controller.getFilmePeloTitulo = getFilmePeloTitulo;
controller.registrarLocacao = registrarLocacao;
controller.devolverFilme = devolverFilme;
module.exports = controller;

function getTodosOsFilmes(req, res, next){    
    filmesService.getTodosOsFilmes(response =>{
        if (response){
            res.json(response);
            res.status(200);
        }else {      
            res.json(constants.error.msg_bad_request);
            res.status(constants.error.msg_bad_request.status);
        }
    })
}

function getFilmePeloTitulo(req, res, next){    
    filmesService.getFilmePeloTitulo(req.params.titulo, response =>{
        if (response){
            res.json(response);
            res.status(200);
        }else {      
            res.json(constants.error.msg_bad_request);
            res.status(constants.error.msg_bad_request.status);
        }
    })
}

function registrarLocacao(req, res, next){    
    filmesService.registrarLocacao(req.body.id_usuario, req.body.id_filme, response =>{
        if (response){
            res.json(response);
            res.status(200);
        }else {      
            res.json(constants.error.msg_bad_request);
            res.status(constants.error.msg_bad_request.status);
        }
    })
}


function devolverFilme(req, res, next){    
    filmesService.devolverFilme(req.body.id_usuario, req.body.id_filme, response =>{
        if (response){
            res.json(response);
            res.status(200);
        }else {      
            res.json(constants.error.msg_bad_request);
            res.status(constants.error.msg_bad_request.status);
        }
    })
}