const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    let returnAddr = req.query.return;
    let username = req.body.name;
    let password = req.body.passwd;
    let error;
    if (password === "letmein") {
        res.cookie("username", username);
        res.cookie("auth-token", "0");
    }
    // Envia mensagem de erro de volta ao cliente junto ao endereço
    if (returnAddr && error) {
        returnAddr += "?err=" + encodeURIComponent(error);
    }
    res.redirect(returnAddr ? returnAddr : "/");
});

router.post("/logout", (req, res) => {
    let returnAddr = req.query.return;
    res.clearCookie("username");
    res.clearCookie("auth-token");
    res.redirect(returnAddr ? returnAddr : "/");
});

module.exports = router;