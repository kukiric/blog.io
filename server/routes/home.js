const postFinder = require("../postfinder.js");
const router = require("express").Router();

router.get("/", async (req, res) => {
    // Preenche o objeto de posts do cliente com os 5 posts mais recentes
    let recentPosts = await postFinder.getMostRecentPaged(5, 0, true);
    res.render("index", {
        pageName: "Home",
        user: req.cookies.fullName,
        username: req.cookies.username,
        posts: recentPosts.data,
        isLastPage: recentPosts.isLastPage,
        header: "Posts Recentes"
    });
});

module.exports = router;