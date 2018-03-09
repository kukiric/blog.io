const express = require("express");
const router = express.Router();

router.get("/posts", (req, res) => {
    console.log("GET /posts");
    res.end();
});

router.post("/posts", (req, res) => {
    console.log("POST /posts");
    res.end();
});

router.get("/posts/:id", (req, res) => {
    console.log("GET /posts/" + req.params.id);
    res.end();
});

router.put("/posts/:id", (req, res) => {
    console.log("PUT /posts/" + req.params.id);
    res.end();
});

router.put("/posts/:id/image", (req, res) => {
    console.log("PUT /posts/" + req.params.id + "/image");
    res.end();
});

router.delete("/posts/:id", (req, res) => {
    console.log("DELETE /posts/" + req.params.id);
    res.end();
});

module.exports = router;