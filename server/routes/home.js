const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {pageName: "Home"});
});

module.exports = router;