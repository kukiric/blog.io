const express = require("express");
const router = express.Router();

async function getPost(db, id) {
    try {
        return await db.one("\
            select posts.title, posts.content, posts.post_date, users.display_name as creator from posts\
              inner join users on id_user = users.id\
              where posts.id = $1", id);
    }
    catch(err) {
        console.warn("[WARN]: " + err);
        return null;
    }
}

router.get("/posts", async (req, res) => {
    console.info("[INFO]: GET /posts");
    res.end();
});

router.post("/posts", async (req, res) => {
    console.info("[INFO]: POST /posts");
    res.end();
});

router.get("/posts/:id", async (req, res) => {
    let id = req.params.id;
    let db = res.locals.db;
    console.info("[INFO]: GET /posts/" + id);
    let post = await getPost(db, id);
    res.send(post);
});

router.put("/posts/:id", async (req, res) => {
    console.info("[INFO]: PUT /posts/" + req.params.id);
    res.end();
});

router.put("/posts/:id/image", async (req, res) => {
    console.info("[INFO]: PUT /posts/" + req.params.id + "/image");
    res.end();
});

router.delete("/posts/:id", async (req, res) => {
    console.info("[INFO]: DELETE /posts/" + req.params.id);
    res.end();
});

module.exports = router;