"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use("Factory");

Factory.blueprint("App/Models/User", async (faker, i, data) => {
    return {
        username: data.username || faker.username(),
        password: data.password || faker.password(),
        email: data.email || faker.email(),
        full_name: data.full_name || faker.name()
    };
});

Factory.blueprint("App/Models/Post", async (faker, i, data) => {
    return {
        title: data.title || faker.sentence({
            words: faker.natural({min: 4, max: 8})
        }),
        content: data.content || faker.paragraph({
            sentences: faker.natural({min: 3, max: 10})
        })
    };
});
