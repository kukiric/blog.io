"use strict";

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use("Factory");

class DatabaseSeeder {
    async run () {
        // Cria o usuário administrador
        const admin = await Factory.model("App/Models/User").create({
            username: "admin",
            password: "admin",
            email: "admin@localhost",
            full_name: "Administrador"
        });
        // Cria vários posts
        for (let i = 0; i < 20; i++) {
            const post = await Factory.model("App/Models/Post").make();
            await admin.posts().save(post);
        }
    }
}

module.exports = DatabaseSeeder;
