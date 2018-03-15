"use strict";

const Model = use("Model");

class Post extends Model {

    /**
     * @param {number} page
     * @param {number} limit
     * @param {string} search
     */
    static async getRecent(page, limit, search) {
        let offset = page * limit;

        // Conta o número de páginas
        let pageCount = new Promise(async resolve => {
            let total = await Post.getCount();
            resolve(Math.ceil(total / limit));
        });

        // Monta a query do banco de dados
        let query = this.query();
        query.select("posts.id", "posts.title", "posts.content", "posts.user_id", "posts.created_at", "users.full_name");
        if (search) {
            query.where("posts.title", "ilike", `%${search}%`);
        }
        query.join("users", "users.id", "posts.user_id");
        query.orderBy("posts.created_at");
        query.offset(offset).limit(limit);
        let result = await query.fetch();

        return {
            isLastPage: page + 1 >= await pageCount,
            data: result.toJSON()
        };
    }

    user() {
        return this.belongsTo("App/Models/User");
    }
}

module.exports = Post;
