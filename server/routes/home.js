const postFinder = require("../postfinder.js");
const router = require("express").Router();

router.get("/", async (req, res) => {
    // Preenche o objeto de posts do cliente com os 10 posts mais recentes
    const recentPosts = await postFinder.getMostRecentPaged(0, true);
    res.render("index", { pageName: "Home", posts: recentPosts.data });
});

module.exports = router;