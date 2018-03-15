"use strict";

const Model = use("Model");

class Post extends Model {
    creator() {
        return this.belongsTo("App/Model/User");
    }
}

module.exports = Post;
