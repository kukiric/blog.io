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
        header: "Posts - Página " + page + 1
    });
});

module.exports = router;