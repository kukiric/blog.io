const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

// Gera uma página html no diretório de saída
function generatePage(pageName, title) {
    return new HtmlWebpackPlugin({
        template: "html/template.ejs",
        filename: pageName + ".html",
        pageName: pageName,
        title: title,
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
        generatePage("index", "Home")
    ],
    devtool: "cheap-source-map"
};
