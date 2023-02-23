'use strict';

const express = require('express');

const HOST = '0.0.0.0';
const PORT = 8000;

// App
const app = express();
app.get('/health', (_, response) => {
    response.send({"status": "OK"});
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
