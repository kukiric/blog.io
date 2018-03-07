const express = require("express");

const api = express();
const config = require("../appconfig.json").api;

api.use(express.static("web/dist"));

const address = config.address;
const port = config.port;
api.listen(port, address, () => {
    console.log("API iniciada em " + address + ":" + port + "...");
});
