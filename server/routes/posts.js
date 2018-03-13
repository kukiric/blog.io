const postFinder = require("../postfinder.js");
const router = require("express").Router();

// Retorna vários posts
router.get("/posts", async (req, res) => {
    let page = parseInt(req.query.page) || 0;
    let search = req.query.q;
    let recentPosts = await postFinder.getMostRecentPaged(5, page, false, search);
    res.render("posts", {
        pageName: "Posts",
        user: req.cookies.fullName,
        username: req.cookies.username,
        posts: recentPosts.data,
        isFirstPage: page == 0,
        isLastPage: recentPosts.isLastPage,
        nextPage: page + 1,
        prevPage: page - 1,
        header: "Posts - Página " + (page + 1)
    });
});

// Retorna um post
router.get("/posts/:id", async (req, res) => {
    let id = req.params.id;
    let post = await postFinder.getSinglePost(id);
    res.render("posts", {
        pageName: post.title,
        user: req.cookies.fullName,
        username: req.cookies.username,
        posts: [post],
        isFirstPage: true,
        isLastPage: true
    });
});

// Envia um post
router.post("/posts", async (req, res) => {
    let returnAddr = req.query.returnTo || "/";
    let title = req.body.title;
    let content = req.body.content;
    let username = req.cookies.username;
    await postFinder.submitPost(title, content, username);
    res.redirect(returnAddr);
});

router.post("/posts/:id/delete", async (req, res) => {
    let returnAddr = req.query.returnTo || "/";
    let id = req.params.id;
    let username = req.cookies.username;
    await postFinder.deletePost(id, username);
    res.redirect(returnAddr);
});

module.exports = router;