const postFinder = require("../postfinder.js");
const router = require("express").Router();

router.get("/posts", async (req, res) => {
    // Preenche o objeto de posts do cliente com os 5 posts mais recentes
    let page = parseInt(req.query.page) || 0;
    let recentPosts = await postFinder.getMostRecentPaged(5, page);
    res.render("posts", {
        pageName: "Posts",
        user: req.cookies.username,
        posts: recentPosts.data,
        isFirstPage: page == 0,
        isLastPage: recentPosts.isLastPage,
        nextPage: page + 1,
        prevPage: page - 1,
        header: "Posts - Página " + (page + 1)
    });
});

router.get("/posts/:id", async (req, res) => {
    let id = req.params.id;
    let post = await postFinder.getSinglePost(id);
    res.render("posts", {
        pageName: post.title,
        user: req.cookies.username,
        posts: [post],
        isFirstPage: true,
        isLastPage: true
    });
});

module.exports = router;