const router = require("express").Router();

// Busca o usuário no banco de dados
async function findUser(e, name) {
    try {
        const match = await e.User.findOne({
            where: {
                username: name
            }
        });
        return match;
    }
    catch(err) {
        console.error(err.stack);
        return null;
    }
}

// Verifica se a senha do usuário está correta
async function checkPassword(e, user, passwd) {
    try {
        const match = await e.User.findOne({
            where: {
                username: user.username,
                passwd: passwd
            }
        });
        return match != null;
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
    console.info("[INFO]: Tentativa de login: " + username);
    let user = await findUser(entities, username);
    if (user && await checkPassword(entities, user, password)) {
        res.cookie("fullName", user.fullName);
        res.cookie("username", user.username);
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
    let returnAddr = req.query.returnTo || "/";
    console.info("[INFO]: Deslogando: " + req.cookies.username);
    res.clearCookie("username");
    res.clearCookie("fullName");
    res.redirect(returnAddr);
});

module.exports = router;