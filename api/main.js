const config = require("./config.js").api;

const express = require("express");
const api = express();

// Configura as rotas
api.use("/", require("./routes/home.js"));
api.use("/", require("./routes/posts.js"));
api.use("/", require("./routes/login.js"));

// Inicia a aplicação
const address = config.address;
const port = config.port;
api.listen(port, address, () => {
    console.log("API iniciada em " + address + ":" + port + "...");
});
