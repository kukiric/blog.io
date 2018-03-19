"use strict";

const Model = use("Model");

class Post extends Model {

    /**
     * @param {number} page
     * @param {number} limit
     * @param {string} search
     */
    static async getRecent(page, limit, search) {
        // Conta o número de páginas
        let pageCount = new Promise(async resolve => {
            let total = await Post.getCount();
            resolve(Math.ceil(total / limit));
        });

        // Monta a query do banco de dados
        let query = this.query();
        if (search) {
            query.where("posts.title", "ilike", `%${search}%`);
        }
        query.orderBy("posts.created_at", "desc");
        query.forPage(page, limit);
        let result = await query.with("user").fetch();

        return {
            isLastPage: page >= await pageCount,
            data: result.toJSON()
        };
    }

    user() {
        return this.belongsTo("App/Models/User");
    }
}

module.exports = Post;
