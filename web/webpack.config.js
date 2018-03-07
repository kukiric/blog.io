const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

// Gera página html no diretório de saída
function generatePage(page) {
    return new HtmlWebpackPlugin({
        template: page,
        filename: path.basename(page)
    });
}

// Configuração do webpack
module.exports = {
    mode: "development",
    context: path.resolve(__dirname, "src"),
    entry: {
        assets: "./assets.js",
        index: "./js/index.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ "style-loader", "css-loader" ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    plugins: [
        generatePage("html/index.html")
    ],
    devServer: {
        contentBase: path.join(__dirname, "public")
    }
};
