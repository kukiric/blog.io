const config = require("./config.js").app;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const expressHandlebars = require("express-handlebars");
const sequelize = require("sequelize");
const markdown = require("markdown").markdown;
const moment = require("moment");
const path = require("path");

let app = express();
let db = new sequelize(config.db.dbname, config.db.username, config.db.password, {
    dialect: "postgres",
    host: config.db.address,
    port: config.db.port,
    returning: true,
    logging: false
});

// Liga o handlebars no servidor
app.engine("hbs", expressHandlebars({
    defaultLayout: "default",
    layoutsDir: "web/views/layouts",
    partialsDir: "web/views/partials",
    extname: "hbs",
    compilerOptions: {
        preventIdent: true
    },
    helpers: {
        dateTime: date => {
            return moment(date).locale("pt-br").format("L");
        },
        markdown: text => {
            return markdown.toHTML(text);
        },
        insertEquals: (text, a, b) => {
            return a == b ? text : "";
        }
    }
}));
app.set("views", path.resolve("./web/views"));
app.set("view engine", "hbs");

// Configura as rotas estáticas
app.use(express.static("node_modules/jquery/dist"));
app.use(express.static("node_modules/bootstrap/dist/js"));
app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.static("web/css"));
app.use(express.static("web/js"));

// Configura os middlewares do express
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Conecta no banco de dados
console.info("[INFO]: Tentando conectar na base de dados \"" + config.db.dbname + "\" em " + config.db.address + ":" + config.db.port);
db.authenticate().then(async () => {
    console.info("[INFO]: Conexão ao banco bem-sucedida!");
    // Inicializa os valores-padrão no banco de dados
    const entities = require("./entities");
    await entities.sync(db);
    await entities.seed();
    // Injeta referências às entidades e ao banco na aplicação
    app.use((req, res, next) => {
        res.locals.db = db;
        res.locals.entities = require("./entities");
        next();
    });

    // Configura as rotas da API
    app.use("/api", require("./routes/api/posts.js"));

    // Configura as rotas base
    app.use("/", require("./routes/login.js"));
    app.use("/", require("./routes/home.js"));

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
    });
}).catch(err => {
    console.error(err.stack);
    process.exit(-1);
});
