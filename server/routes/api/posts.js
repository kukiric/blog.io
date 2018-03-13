const router = require("express").Router();
const postFinder = require("../../postfinder.js");

// Retorna até 10 posts mais recentes por página
router.get("/posts", async (req, res) => {
    let page = req.query.p || 0;
    let entities = res.locals.entities;
    let posts = await postFinder.getMostRecentPaged(page);
    res.contentType("json");
    res.send(JSON.stringify(posts));
});

// Envia um novo post
router.post("/posts", async (req, res) => {
    res.end();
});

// Retorna apenas um post
router.get("/posts/:id", async (req, res) => {
    let id = req.params.id;
    console.info("[INFO]: GET /posts/" + id);
    let entities = res.locals.entities;
    let post = await postFinder.getSinglePost(id);
    res.contentType("json");
    res.send(JSON.stringify(post));
});

// Atualiza um post
router.put("/posts/:id", async (req, res) => {
    res.end();
});

// TODO: Envia a imagem de um post
// router.put("/posts/:id/image", async (req, res) => {
//     res.end();
// });

// Remove um post
router.delete("/posts/:id", async (req, res) => {
    res.end();
});

module.exports = {
    router: router
};
