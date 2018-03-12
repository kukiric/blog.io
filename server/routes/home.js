const express = require("express");
const router = express.Router();
const posts = require("./api/posts");

router.get("/", async (req, res) => {
    // Preenche o objeto de posts do cliente com os 10 posts mais recentes
    let entities = res.locals.entities;
    const recentPosts = await posts.getAllPostsPaged(entities, 0);
    res.render("index", {pageName: "Home", posts: recentPosts});
});

module.exports = router;