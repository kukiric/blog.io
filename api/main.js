const express = require("express");

const app = express();

app.use(express.static("web/dist"));

const address = "127.0.0.1";
const port = 8080;
app.listen(port, address, () => {
    console.log("API iniciada em " + address + ":" + port + "...");
});
