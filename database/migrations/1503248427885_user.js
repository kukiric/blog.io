"use strict";

const Schema = use("Schema");

class UserSchema extends Schema {
    up () {
        this.create("users", table => {
            table.increments().primary();
            table.string("username").notNullable().unique();
            table.string("password").notNullable();
            table.string("full_name").notNullable();
            table.timestamps();
        });
    }

    down () {
        this.drop("users");
    }
}

module.exports = UserSchema;
