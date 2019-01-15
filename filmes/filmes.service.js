const constants = require('./filmes.constants.json');
const mySql = require('../config/mySQL');

var service = {};
service.getTodosOsFilmes = getTodosOsFilmes;
service.getFilmePeloTitulo = getFilmePeloTitulo;
service.registrarLocacao = registrarLocacao;
service.devolverFilme = devolverFilme;
module.exports = service;

function getTodosOsFilmes(callback){	
    mySql.connection.query("SELECT id, titulo, diretor, IF(disponivel, 'true', 'false') as disponivel FROM filmes", 
    (err, result, fields) => {
        if (err) callback(false);
        let json = JSON.stringify(result)
        json = JSON.parse(json);
        callback(json);
    });
}

function getFilmePeloTitulo(titulo, callback){
    titulo = '%' + titulo + '%';
    mySql.connection.query("SELECT id, titulo, diretor, IF(disponivel, 'true', 'false') as disponivel FROM filmes WHERE titulo LIKE ?", 
    [titulo], (err, result, fields) => {
        if (err) callback(false);
        let json = JSON.stringify(result)
        json = JSON.parse(json);
        callback(json);
    });
}

function registrarLocacao(id_usuario, id_filme, callback){
    indisponibilizarFilmePeloId(id_filme).then(result => {
        if(result == true){        
            mySql.connection.query("INSERT INTO locacoes (id_usuario, id_filme) VALUES (?, ?)", 
            [id_usuario, id_filme], (err, result, fields) => {
                if (err) callback(false);
                callback(constants.success.msg_filme_locado);
            });
        }else{
            callback(constants.error.msg_filme_ja_reservado);
        }    
    })         
}

function verificaDisponibilidadeDoFilmePeloId(id_filme){
    return new Promise((resolve, reject) => {
        mySql.connection.query("SELECT * FROM filmes WHERE id = ?", 
        [id_filme], (err, result, fields) => {
            if (err) resolve(false);
            if(result[0]){
                let json = JSON.stringify(result)
                json = JSON.parse(json);
                if(json[0].disponivel == 1){
                    resolve(true);
                }else{
                    resolve(false);
                }
            }
            resolve(constants.error.msg_filme_nao_existente);
        }); 
    })    
}

function indisponibilizarFilmePeloId(id_filme){ 
    return new Promise ((resolve, reject) =>{
        verificaDisponibilidadeDoFilmePeloId(id_filme).then(result => {
            if(result == true){        
                mySql.connection.query("UPDATE filmes SET disponivel = 0 WHERE id = ?", 
                [id_filme], (err, result, fields) => {
                    if (err) resolve(false);
                    resolve(true);
                });     
            }else{
                resolve(false);
            }  
        })
    })                
}   

function devolverFilme(id_usuario, id_filme, callback){
    mySql.connection.query("UPDATE locacoes SET entregue = 1 WHERE id_usuario = ? AND id_filme = ?", 
    [id_usuario, id_filme], (err, result, fields) => {
        if(err) callback(err);
        let json = JSON.stringify(result)
        json = JSON.parse(json);
        if(json.changedRows == 0) {
            callback(constants.error.msg_locacao_nao_alterada);
        }else{
            mySql.connection.query("UPDATE filmes SET disponivel = 1 WHERE id = ?", 
            [id_filme], (err, result, fields) => {
                if(err) callback(err);
                callback(constants.success.msg_filme_devolvido);
            }); 
        }
    });   
}