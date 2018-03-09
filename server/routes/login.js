const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    let returnAddr = req.query.return || "/";
    let username = req.body.name;
    let password = req.body.passwd;
    if (password === "letmein") {
        res.cookie("username", username);
        res.cookie("auth-token", "0");
    }
    else {
        // Envia mensagem de erro de volta ao cliente junto ao endereço
        returnAddr += "?err=login";
    }
    res.redirect(returnAddr);
});

router.post("/logout", (req, res) => {
    let returnAddr = req.query.return || "/";
    res.clearCookie("username");
    res.clearCookie("auth-token");
    res.redirect(returnAddr);
});

module.exports = router;