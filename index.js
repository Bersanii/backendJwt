require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const usuario = require("./routes/usuario");
const InicializaMongoServer = require("./config/db");

// Initializamos o servidor MongoDb
InicializaMongoServer();

const app = express();

// Porta Default
const PORT = process.env.DEFAULT_PORT || 4000;

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "👏 API 100% funcional!" });
});

/**
 * Router Middleware
 * Router - /usuario/*
 * Method - *
 */
app.use("/usuario", usuario);

app.listen(PORT, (req, res) => {
  console.log(`🖥️ Servidor iniciado na porta ${PORT}`);
});
