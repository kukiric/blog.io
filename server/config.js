const path = require("path");
const fs = require("fs");

const configPath = "./appconfig.json";

if (fs.existsSync(configPath)) {
    // Carrega a configuração atual
    let modulePath = path.resolve(configPath);
    module.exports = require(modulePath);
}
else {
    // Cria uma configuração padrão
    const defaultConfig =  {
        api: {
            address: "127.0.0.1",
            port: 8080,
            db: {
                dbname: "",
                username: "",
                password: "",
                port: 5432
            }
        }
    };
    let configFile = fs.openSync(configPath, "a+");
    fs.writeSync(configFile, JSON.stringify(defaultConfig, undefined, 4));
    fs.closeSync(configFile);
    console.log("Arquivo de configuração gerado em " + configPath + ". Edite-o com as configurações desejadas e reinicie a aplicação.");
    process.exit(1);
}
