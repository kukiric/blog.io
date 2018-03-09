import QueryParser from "./queryparser.js";
import $ from "jquery";
import Cookies from "js-cookie";
import "popper.js";
import "bootstrap";

window.$user = {
    name: Cookies.get("username"),
    token: Cookies.get("auth-token")
};

$(document).ready(() => {
    let loginForm = $("#login-form");
    // Exibe o nome do usuário logado se ele existir
    if (window.$user.name) {
        $("#user-widget").removeClass("no-display");
        $("#user-name").text(window.$user.name);
    }
    else {
        loginForm.removeClass("no-display");
    }
    // Exibe mensagem de erro se necessário
    let queryParser = new QueryParser(window);
    let pageError = queryParser.getQueryParam("err");
    if (pageError != undefined) {
        loginForm.popover({
            content: pageError,
            placement: "bottom"
        });
        loginForm.delay(200).popover("show").on("focus", self => self.popover("hide"));
        // Remove o parâmetro para não continuar na próxima página
        history.replaceState({}, document.title, queryParser.getURIWithoutQueryParam("err"));
    }
    // Configura o endereço de retorno do login
    loginForm.attr("action", "/login?return=" + encodeURIComponent(location.href));
});
