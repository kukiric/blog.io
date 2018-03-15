"use strict";

const Schema = use("Schema");

class PostSchema extends Schema {
    up () {
        this.create("posts", (table) => {
            table.increments().primary();
            table.string("title").notNullable();
            table.text("content").notNullable();
            table.integer("user_id").notNullable().references("users.id");
            table.timestamps();
        });
    }

    down () {
        this.drop("posts");
    }
}

module.exports = PostSchema;
