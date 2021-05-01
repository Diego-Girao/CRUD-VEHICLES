const express = require('express');
const bodyParser = require('body-parser');

const appRouter = require('./router');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

appRouter.configure(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Servidor rodando... http://localhost:3000"));