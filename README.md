# Especificação do exercício

## Dependencias utilizadas

- body-parser: https://github.com/expressjs/body-parser
- cors: https://github.com/expressjs/cors
- express: https://github.com/expressjs/express
- method-override: https://github.com/expressjs/method-override
- mm-node-logger: https://github.com/martinmicunda/mm-node-logger
- morgan: https://github.com/expressjs/morgan
- nodemon: https://github.com/remy/nodemon
- md5: https://www.npmjs.com/package/md5
- mysql: https://www.npmjs.com/package/mysql
- jsonwebtoken: https://www.npmjs.com/package/jsonwebtoken

## Instalação

- npm install

## Execução  

- npm start  

## Configurando o banco e o servidor

- Todas as configurações de conexãode banco de dados e portas do servidor devem ser configuradao no arquivo /config/config.js

## Rotas  

- API http://localhost:3000

### POST /registrar

- Pasando pelo corpo da requisição um nome, email e senha registra um usuário.
- Exemplo requisição
```javascript
{ 
    "nome": "Guilherme Webber Mendes",
    "email": "guilherme.webber@outlook.com",
    "senha": "123456"
}
```
- Exemplo de retorno da requisição
```javascript
{
    "status": 201,
    "message": {
        "result": "success",
        "message": "Usuário cadastrado"
    }
}
```

### POST /login

- Passando pelo corpo da requisião um email e uma senha previamente registrados, realiza o login.
- Exemplo requisição
```javascript
{ 
    "email": "guilherme.webber@outlook.com",
    "senha": "123456"
}
```
- Exemplo de retorno da requisição
```javascript
{
    "status": 200,
    "message": {
        "result": "success",
        "message": "Usuário logado",
        "auth": true,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNTQ2OTE2MTU2LCJleHAiOjE1NDcwMDI1NTZ9.T7XCqDtiV5dA7Aw_8d-8vHN3RsXqXI-2xhOP8rNf1Es"
    }
}
```

### GET /logout/:id_usuario

- Passando o ID do usuário por parametro e o token adquirido no login no header da requisição como x-access-token realiza o logout do usuário invalidando o token de acesso.
- Exemplo de requisição: 
http://localhost:3000/api/logout/3 
Header: 
    x-access-token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNTQ2OTE2MTU2LCJleHAiOjE1NDcwMDI1NTZ9.T7XCqDtiV5dA7Aw_8d-8vHN3RsXqXI-2xhOP8rNf1Es"

- Exemplo de retorno da requisição
```javascript
{
    "status": 200,
    "message": {
        "result": "success",
        "message": "Usuário deslogado"
    }
}
```

### GET /filmes

- Passando o token de login por header na requisição como x-access-token, retorna todos os filmes no banco.
- Exemplo retorno da requisição
```javascript
[
    {
        "id": 1,
        "titulo": "John Wick",
        "diretor": "Chad Stahelski, David Leitch",
        "disponivel": "true"
    },
    {
        "id": 2,
        "titulo": "John Wick: Um Novo Dia Para Matar",
        "diretor": "Chad Stahelski",
        "disponivel": "true"
    },
    {
        "id": 3,
        "titulo": "Matrix",
        "diretor": "Lana Wachowski, Lilly Wachowski",
        "disponivel": "true"
    },
    {
        "id": 4,
        "titulo": "Sinais",
        "diretor": "M. Night Shyamalan",
        "disponivel": "true"
    },
    {
        "id": 5,
        "titulo": "Sinais",
        "diretor": "M. Night Shyamalan",
        "disponivel": "true"
    },
    {
        "id": 6,
        "titulo": "Sinais",
        "diretor": "M. Night Shyamalan",
        "disponivel": "true"
    }
]
```

### GET /filmes/:titulo

- Passando uma string por parametro na requisição, retorna os filmes do banco que contém os caracteres enviados.
- Exemplo requisição: http://localhost:3000/filmes/John
- Exemplo retorno da requisição
```javascript
[
    {
        "id": 1,
        "titulo": "John Wick",
        "diretor": "Chad Stahelski, David Leitch",
        "disponivel": "true"
    },
    {
        "id": 2,
        "titulo": "John Wick: Um Novo Dia Para Matar",
        "diretor": "Chad Stahelski",
        "disponivel": "true"
    }
]
```

### POST /locarFilme

- Passando pelo corpo da requisição o ID do usuário e o ID do filme, com o token de login no header como x-access-token, indisponibiliza um filme e realiza a locação dele para o usuário informado.
- Exemplo requisição
```javascript
{ 
    "id_usuario": 3,
    "id_filme": 3
}
```
- Exemplo de retorno da requisição
```javascript
{
    "status": 200,
    "message" : {
        "result" : "success",
        "message": "Filme locado"
    }
}
```

### POST /devolverFilme

- Passando pelo corpo da requisição o ID do usuário e o ID do filme, com o token de login no header como x-access-token, volta a disponibilizar um filme locado e realiza a devolução do filme.
- Exemplo requisição
```javascript
{ 
    "id_usuario": 3,
    "id_filme": 3
}
```
- Exemplo de retorno da requisição
```javascript
{
    "status": 200,
    "message": {
        "result": "success",
        "message": "Filme devolvido"
    }
}
```
