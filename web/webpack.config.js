const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

// Gera uma página html no diretório de saída
function generatePage(pageName) {
    return new HtmlWebpackPlugin({
        template: "html/template.ejs",
        filename: pageName + ".html",
        apiPath: "http://localhost:8081/",
        pageName: pageName,
        inject: false
    });
}

// Configuração do webpack
module.exports = {
    mode: "development",
    context: path.resolve(__dirname, "src"),
    entry: {
        assets: "./assets.js",
        header: "./js/header.js",
        index: "./js/index.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ "style-loader", "css-loader" ]
            },
            {
                test: /\.html$/,
                use: [ "html-loader" ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    plugins: [
        generatePage("index")
    ],
    devServer: {
        contentBase: path.join(__dirname, "public")
    }
};
