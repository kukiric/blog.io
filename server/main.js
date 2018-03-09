const config = require("./config.js").app;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const pgPromise = require("pg-promise")();

let app = express();
let db = pgPromise({
    host: config.db.address,
    port: config.db.port,
    database: config.db.dbname,
    user: config.db.username,
    password: config.db.password
});

// Configura os middlewares do express
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());

// Injeta uma referência ao objeto do banco de dados na aplicação
app.use((req, res, next) => {
    res.locals.db = db;
    next();
});

// Configura as rotas da API
app.use("/api", require("./routes/api/posts.js"));

// Configura as rotas base
app.use("/", require("./routes/login.js"));

// Conecta no banco de dados
console.info("[INFO]: Tentando conectar na base de dados \"" + config.db.dbname + "\" em " + config.db.address + ":" + config.db.port);
db.connect().then(() => {
    console.info("[INFO]: Conexão ao banco bem-sucedida!");
    // Inicia a aplicação
    app.listen(config.port, config.address, () => {
        console.info("[INFO]: Servidor iniciado em " + config.address + ":" + config.port);
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
    });
}).catch(err => {
    console.error("[ERROR]: Falha ao conectar no banco de dados: " + err);
    process.exit(-1);
});
