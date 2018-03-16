"use strict";

class PostValidator {
    get rules() {
        return {
            title: "required",
            content: "required|min:20"
        };
    }

    async fails() {
        this.ctx.session.flash({ post: "O conteúdo do post deve conter no mínimo 20 caracteres!" });
        this.ctx.response.redirect("back");
    }
}

module.exports = PostValidator;