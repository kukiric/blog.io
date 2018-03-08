const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    console.log("POST /login");
    res.end();
});

module.exports = router;