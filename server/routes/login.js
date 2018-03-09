const express = require("express");
const router = express.Router();

// Busca o usuário no banco de dados
async function findUser(db, name) {
    try {

        return await db.one("select * from users where login_name = $1", name);
    }
    catch(err) {
        console.warn("[WARN]: " + err);
        return null;
    }
}

// Verifica se a senha do usuário está correta
async function checkPassword(db, user, passwd) {
    try {
        let match = await db.oneOrNone("select * from users where login_name = $1 and passwd = $2", [user.login_name, passwd]);
        return match.login_name === user.login_name;
    }
    catch(err) {
        console.warn("[WARN]: " + err);
        return null;
    }
}

router.post("/login", async (req, res) => {
    let username = req.body.name || "";
    let password = req.body.passwd || "";
    let returnAddr = req.query.return || "/";
    let db = res.locals.db;
    console.info("[INFO]: Tentativa de login: " + username);
    let user = await findUser(db, username);
    if (user && await checkPassword(db, user, password)) {
        res.cookie("username", user.login_name);
        res.cookie("auth-token", "0");
        console.info("[INFO]: Usuário logado com sucesso");
    }
    else {
        console.info("[INFO]: Usuário não logou por erro de credencial");
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