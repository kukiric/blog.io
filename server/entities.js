const seq = require("sequelize");

/**
 * @param {seq.Sequelize} db Instância do banco criado pelo Sequelize
 */
function entityFactory(db) {
    console.info("[INFO]: Criando entidades...");
    return {
        User: db.define("user", {
            username: { type: seq.STRING, allowNull: false, unique: true },
            fullName: { type: seq.STRING, allowNull: false },
            passwd: { type: seq.STRING, allowNull: false }
        }),

        Post: db.define("post", {
            title: { type: seq.STRING, allowNull: false },
            content: { type: seq.TEXT, allowNull: false }
        }),

        Comment: db.define("comment", {
            content: { type: seq.TEXT, allowNull: false }
        }),

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
            return this;
        },

        sync: async function() {
            // Define as relações
            this.Post.belongsTo(this.User);
            this.Comment.belongsTo(this.User);
            this.Post.hasMany(this.Comment);
            // Cria as tabelas
            await db.sync({
                force: true
            });
            return this;
        }
    };
}

module.exports = entityFactory;