const express = require("express");
const router = express.Router();

// Busca o usuário no banco de dados
async function findUser(e, name) {
    try {
        const match = await e.User.findAndCountAll({
            where: {
                username: name
            },
            limit: 1
        });
        return match.rows[0];
    }
    catch(err) {
        console.error(err.stack);
        return null;
    }
}

// Verifica se a senha do usuário está correta
async function checkPassword(e, user, passwd) {
    try {
        const match = await e.User.findAndCountAll({
            where: {
                username: user.username,
                passwd: passwd
            },
            limit: 1
        });
        return match.rows[0] != null;
    }
    catch(err) {
        console.error(err.stack);
        return null;
    }
}

// Autentica o usuário
router.post("/login", async (req, res) => {
    let username = req.body.name || "";
    let password = req.body.passwd || "";
    let returnAddr = req.query.returnTo || "/";
    let entities = res.locals.entities;
    console.info("[INFO]: POST /login");
    console.info("[INFO]: Tentativa de login: " + username);
    let user = await findUser(entities, username);
    if (user && await checkPassword(entities, user, password)) {
        res.cookie("username", user.fullName);
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

// Cancela a autenticação do usuário
router.post("/logout", (req, res) => {
    let returnAddr = req.query.return || "/";
    res.clearCookie("username");
    res.clearCookie("auth-token");
    res.redirect(returnAddr);
});

module.exports = router;