"use strict";
const express = require('express');
const app = express();
app.get('/', (_req, res) => {
    res.send('Hello world!!!');
});
app.get('/divide', (req, res) => {
    const { v1, v2 } = req.query;
    const result = `Resultado da divisão é: ${Number(v1) / Number(v2)} na versão 1.0 da API`;
    return res.status(200).send(result);
});
app.listen(8080, () => {
    console.log("listening at 8080");
});
//# sourceMappingURL=index.js.map