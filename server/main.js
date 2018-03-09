const config = require("./config.js").api;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
let app = express();

// Configura os middlewares do express
app.use(bodyParser());
app.use(cookieParser());

// Configura as rotas da API
app.use("/api", require("./routes/api/posts.js"));

// Configura as rotas base
app.use("/", require("./routes/login.js"));

// Adiciona o webpack com auto compilação em modo de desenvolvimento
if (process.env.NODE_ENV === "development") {
    console.info("[INFO]: Ligando webpack-dev-middleware...");
    const webpack = require("webpack");
    const devMiddleware = require("webpack-dev-middleware");
    const webpackConfig = require("../web/webpack.config.js");
    const compiler = webpack(webpackConfig);
    app.use(devMiddleware(compiler));
}
else {
    app.use(express.static("web/dist"));
}

// Inicia a aplicação
const address = config.address;
const port = config.port;
app.listen(port, address, () => {
    console.log("[INFO]: Servidor iniciado em " + address + ":" + port);
});
