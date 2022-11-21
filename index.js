// (0) Importações
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
/******************************************************/
// (1) Criar serviço
const app = express();

/******************************************************/

// (2) Aplicando configurações dentro do express
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/******************************************************/
// (4) Configurar o Cors - Primeira maneira
var corsOptions = {
  origin: "http://exemplo.com",
  optionsSuccessStatus: 1200,
};

var allowList = ["http://exemplo1.com", "http://exemplo2.com"];

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;

  if (allowList.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }

  callback(null, corsOptions);
};

// (4) Configurar o Cors - Segunda maneira

/******************************************************/

// (3) Criação de api para simular banco de dados
const data = [];

// http://localhost:5000
app.get("/", (req, res) => {
  // retorna o objeto que foi criado (GET)
  return res.json({ data });
});

// http://localhost:5000/add
app.post("/add", (req, res) => {
  // Atualiza o objeto com dados do usuario (POST)
  const result = req.body;

  if (!result) {
    return res.status(400).end();
  } else {
    data.push(result);
    return res.json({ result });
  }
});

/******************************************************/
// (4)
// http://localhost:5000/addCors
app.post("/addCors", cors(corsOptions), (req, res) => {
  // Atualiza o objeto com dados do usuario (POST)
  const result = req.body;

  if (!result) {
    return res.status(400).end();
  } else {
    data.push(result);
    return res.json({ result });
  }
});

// (4)
// http://localhost:5000/addListCors
app.post("/addListCors", cors(corsOptionsDelegate), (req, res) => {
  // Atualiza o objeto com dados do usuario (POST)
  const result = req.body;

  if (!result) {
    return res.status(400).end();
  } else {
    data.push(result);
    return res.json({ result });
  }
});

/******************************************************/

// (2)
app.listen(5000, () =>
  console.log("Express iniciado na porta 5000 http://localhost:5000")
);
