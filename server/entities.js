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
            creator: { type: seq.STRING, allowNull: false },
            content: { type: seq.TEXT, allowNull: false }
        }),

        // Define as relações
        this.Post.belongsTo(this.User, { as: "creator", foreignKey: { allowNull: false } });
        this.Post.hasMany(this.Comment, { foreignKey: { allowNull: false } });

        // Sincroniza o modelo com o banco
        await db.sync();
    },

    seed: async function() {
        // Sempre retorna o valor no upsert
        const opts = { returning: true };

        // Cria o usuário administrador padrão
        const user = await this.User.upsert({
            username: "admin",
            fullName: "Ricardo Maes",
            passwd: "admin"
        }, opts);

        // Cria o primeiro post do blog
        const post = await this.Post.upsert({
            id: 1,
            title: "Bem vindo ao Blog.io!",
            content: require("./lipsum.js"),
            creatorId: user[0].id
        }, opts);

        // Cria o primeiro comentário do blog
        const comment = await this.Comment.upsert({
            id: 1,
            creator: "Comentador",
            content: "Primeiro comentário!",
            postId: post[0].id
        }, opts);
    }
};
