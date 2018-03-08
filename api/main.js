const config = require("./config.js").api;

const express = require("express");
const api = express();

api.use(express.static("web/dist"));

// Inicia a aplicação
const address = config.address;
const port = config.port;
api.listen(port, address, () => {
    console.log("API iniciada em " + address + ":" + port + "...");
});
