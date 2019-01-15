--Usuarios

CREATE TABLE usuarios (
 id int(11) NOT NULL,
 nome varchar(100) NOT NULL,
 email varchar(100) NOT NULL,
 senha varchar(100) NOT NULL
); 

ALTER TABLE usuarios
ADD CONSTRAINT pk_usuarios
PRIMARY KEY (id);

ALTER TABLE usuarios CHANGE id id INT( 11 ) NOT NULL AUTO_INCREMENT;

--Tokens

CREATE TABLE tokens (
id_usuario int(11) NOT NULL,
token varchar(555) NOT NULL
); 

ALTER TABLE tokens
ADD CONSTRAINT fk_usuarios
FOREIGN KEY (id_usuario) references usuarios (id);
ALTER TABLE tokens
ADD CONSTRAINT pk_tokens
PRIMARY KEY (token, id_usuario);

select * from tokens;


--Filmes

CREATE TABLE filmes (
 id int(11) NOT NULL,
 titulo varchar(100) NOT NULL,
 diretor varchar(100) NOT NULL,
 disponivel bool default true
); 

ALTER TABLE filmes
ADD CONSTRAINT pk_filmes
PRIMARY KEY (id);

ALTER TABLE filmes CHANGE id id INT( 11 ) NOT NULL AUTO_INCREMENT;

-- Locacoes

CREATE TABLE locacoes (
 id int(11) NOT NULL,
 id_usuario int(11) NOT NULL,
 id_filme int(11) NOT NULL,
 entregue bool default false
); 

ALTER TABLE locacoes
ADD CONSTRAINT fk_usuarios
FOREIGN KEY (id_usuario) references usuarios;
ALTER TABLE locacoes
ADD CONSTRAINT fk_filmes
FOREIGN KEY (id_filme) references filmes;
ALTER TABLE locacoes
ADD CONSTRAINT pk_locacoes
PRIMARY KEY (id, id_usuario, id_filme);

ALTER TABLE locacoes CHANGE id id INT( 11 ) NOT NULL AUTO_INCREMENT; 