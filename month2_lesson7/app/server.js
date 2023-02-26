'use strict';

const express = require('express');

const HOST = '0.0.0.0';
const PORT = 8000;

// App
const app = express();
app.get('/health', (request, response) => {
    response.send({"status": "OK"});
});

// Readiness or Liveness probes
app.get('/healthz', (request, response) => {
    response.sendStatus(200);
});

app.get('/hello/:name/:asterisk', (request, response) => {
    response.send({
        "name": request.params.name,
        "asterisk": request.params.asterisk,
        "query": request.query,
    });
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
