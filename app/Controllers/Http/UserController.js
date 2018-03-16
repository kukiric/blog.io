"use strict";

class UserController {

    async login({ request, session, auth, response }) {
        const body = request.post();
        try {
            await auth.attempt(body.username, body.password);
        }
        catch (error) {
            session.flash({ login: `O usuário "${body.username}" não existe ou a senha fornecida é incorreta` });
        }
        return response.redirect("back");
    }

    async logout({ auth, response }) {
        auth.logout();
        return response.redirect("back");
    }
}

module.exports = UserController;
