'use strict';

const dotenv = require("dotenv");
dotenv.config();

// db
const pgp = require('pg-promise')({capSQL: true});
const db = pgp({
    application_name: process.env.APP_NAME,
    host: process.env.DB_HOST,
    database: process.env.POSTGRES_DB,
    port: process.env.DB_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
});

// App
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jsonParser = bodyParser.json();
const PORT = process.env.APP_PORT;
const HOST = '0.0.0.0';

//get user
app.get('/user/:userid', (request, response) => {
    db.oneOrNone('SELECT * from public.users u where u.userid = $1', parseInt(request.params.userid))
        .then(data => response.send(data))
        .catch(console.log);
});

// new user
app.post('/user/', jsonParser, (request, response) => {
    db.one('INSERT INTO public.users(name, age) VALUES($1, $2) RETURNING *',
        [request.body.name, request.body.age])
        .then(data => response.send(data))
        .catch(console.log);
});

//update user
app.put('/user/:userid', jsonParser, (request, response) => {
    db.one('UPDATE public.users SET name = $2, age = $3 WHERE userid = $1 RETURNING *',
        [parseInt(request.params.userid), request.body.name, request.body.age])
        .then(data => response.send(data))
        .catch(console.log);
});

// delete user
app.delete('/user/:userid', jsonParser, (request, response) => {
    db.result('DELETE FROM public.users WHERE userid = $1', [parseInt(request.params.userid)])
        .then(result => response.sendStatus(result.rowCount > 0 ? 200 : 500))
        .catch(console.log);
});

// Readiness or Liveness probes
app.get('/healthz', (request, response) => {
    response.sendStatus(200);
});

app.listen(PORT, HOST, () => console.log(`Running on http://${HOST}:${PORT}`));
