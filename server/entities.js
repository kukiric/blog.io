const seq = require("sequelize");

module.exports = {
    User: undefined,
    Post: undefined,
    Comment: undefined,

    /**
     * Define e sincroniza as entidades do banco
     * @param {seq.Sequelize} db Instância do banco criado pelo Sequelize
     */
    sync: async function(db) {
        console.info("[INFO]: Criando as entidades do banco...");

        // Define as entidades
        this.User = db.define("user", {
            username: { type: seq.STRING, allowNull: false, unique: true },
            fullName: { type: seq.STRING, allowNull: false },
            passwd: { type: seq.STRING, allowNull: false }
        }),

        this.Post = db.define("post", {
            title: { type: seq.STRING, allowNull: false },
            content: { type: seq.TEXT, allowNull: false }
        }),

        this.Comment = db.define("comment", {
            content: { type: seq.TEXT, allowNull: false }
        }),

        // Define as relações
        this.Post.belongsTo(this.User);
        this.Comment.belongsTo(this.User);
        this.Post.hasMany(this.Comment);

        // Sincroniza o modelo com o banco
        await db.sync({
            force: true
        });
    },

    seed: async function() {
        // Cria o usuário administrador padrão
        await this.User.findOrCreate({
            where: {
                username: "admin"
            },
            defaults: {
                fullName: "Ricardo Maes",
                passwd: "admin"
            }
        });

        // Cria o primeiro post do blog
        await this.Post.create({
            title: "Bem vindo ao Blog.io!",
            content: require("./lipsum.js")
        });
    }
};
