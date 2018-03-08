const config = require("./config.js").api;
const express = require("express");
let app = express();

// Configura as rotas da API
// app.use("/", require("./routes/home.js"));
app.use("/", require("./routes/posts.js"));
app.use("/", require("./routes/login.js"));

// Configura as rotas do servidor
app.post("/login", (req, res) => {
    res.redirect("/");
});

// Adiciona o webpack com auto compilação em modo de desenvolvimento
if (process.env.NODE_ENV === "development") {
    console.info("Ligando webpack-dev-middleware...");
    const webpack = require("webpack");
    const devMiddleware = require("webpack-dev-middleware");
    const webpackConfig = require("../web/webpack.config.js");
    const compiler = webpack(webpackConfig);
    app.use(devMiddleware(compiler));
}

// Inicia a aplicação
const address = config.address;
const port = config.port;
app.listen(port, address, () => {
    console.log("Servidor iniciado em " + address + ":" + port);
});
