const express = require("express");
const router = express.Router();

const ITEMS_PER_PAGE = 10;

async function getSinglePost(e, id) {
    try {
        const result = await e.Post.findOne({
            attributes: [ "title", "content", "createdAt", "creatorId" ],
            include: [
                { model: e.User, as: "creator", attributes: [ "fullName" ] },
                { model: e.Comment, attributes: [ "creator", "content", "createdAt" ] }
            ]
        });
        // Remove o id do usuário antes de retornar
        result.creatorId = undefined;
        return result;
    }
    catch(err) {
        console.error(err.stack);
        return null;
    }
};

async function getAllPostsPaged(e, page) {
    try {
        const results = await e.Post.findAll({
            limit: ITEMS_PER_PAGE,
            offset: ITEMS_PER_PAGE * page,
            attributes: [ "title", "content", "createdAt", "creatorId" ],
            include: [
                { model: e.User, as: "creator", attributes: [ "fullName" ] },
                { model: e.Comment, attributes: [ "creator", "content", "createdAt" ] }
            ]
        });
        // Remove o id do usuário antes de retornar
        return results.map(item => { item.creatorId = undefined; return item; });
    }
    catch(err) {
        console.error(err.stack);
        return null;
    }
};

// Retorna até 10 posts de acordo com a página requerida
router.get("/posts", async (req, res) => {
    console.info("[INFO]: GET /posts");
    let page = req.query.p || 0;
    let entities = res.locals.entities;
    let posts = await getAllPostsPaged(entities, page);
    res.send("<pre>" + JSON.stringify(posts, undefined, 4) + "</pre>");
});

// Envia um novo post
router.post("/posts", async (req, res) => {
    console.info("[INFO]: POST /posts");
    res.end();
});

// Retorna apenas um post
router.get("/posts/:id", async (req, res) => {
    let id = req.params.id;
    console.info("[INFO]: GET /posts/" + id);
    let entities = res.locals.entities;
    let post = await getSinglePost(entities, id);
    res.send("<pre>" + JSON.stringify(post, undefined, 4) + "</pre>");
});

// Atualiza um post
router.put("/posts/:id", async (req, res) => {
    console.info("[INFO]: PUT /posts/" + req.params.id);
    res.end();
});

// TODO: Envia a imagem de um post
// router.put("/posts/:id/image", async (req, res) => {
//     console.info("[INFO]: PUT /posts/" + req.params.id + "/image");
//     res.end();
// });

// Remove um post
router.delete("/posts/:id", async (req, res) => {
    console.info("[INFO]: DELETE /posts/" + req.params.id);
    res.end();
});

module.exports = router;