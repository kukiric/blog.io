const path = require("path");

// Configuração do webpack
module.exports = {
    mode: process.env.NODE_ENV || "production",
    devtool: process.env.NODE_ENV === "development" ? "source-map" : "none",
    context: path.resolve(__dirname, "src"),
    entry: {
        header: "./header.js",
        index: "./index.js"
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            name: "vendor"
        }
    },
    output: {
        path: path.resolve(__dirname, "./js"),
        filename: "[name].js"
    }
};