import * as express from 'express';
const app = express();

app.get('/', (_req, res) => {
    return res.status(200).send('Hello world!!!');
});

app.get('/divide', (req, res) => {
    const { v1, v2 } = req.query;
    if (v1 === "0" || v2 === "0") {
        return res.status(400).send('Impossível dividir por 0');
    }

    const result = `Resultado da divisão é: ${Number(v1) / Number(v2)}`;

    return res.status(200).send(result);
});

app.listen(8080, () => {
    console.log("listening at 8080");
});
