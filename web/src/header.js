import QueryParser from "./queryparser.js";
import Cookies from "js-cookie";
import $ from "jquery";
import "bootstrap";
import "popper.js";

window.$user = {
    name: Cookies.get("username"),
    token: Cookies.get("auth-token")
};

const errors = {
    login: "O usuário informado não existe ou a senha está incorreta."
};

$(document).ready(() => {
    let loginForm = $("#login-form");
    let logoutForm = $("#logout-form");
    // Exibe o nome do usuário logado se ele existir
    if (window.$user.name) {
        $("#user-widget").removeClass("d-none");
        $("#user-name").text(window.$user.name);
        $("#navbar-toggler").addClass("d-none");
    }
    else {
        loginForm.removeClass("d-none");
    }
    // Exibe mensagem de erro se necessário
    let queryParser = new QueryParser(window);
    let errorType = queryParser.getQueryParam("err");
    if (errorType != undefined) {
        loginForm.popover({
            content: errors[errorType],
            placement: "bottom"
        });
        loginForm.delay(200).popover("show").on("focus", self => self.popover("hide"));
        // Remove o parâmetro para não continuar na próxima página
        history.replaceState({}, document.title, queryParser.getURIWithoutQueryParam("err"));
    }
    // Configura os endereço de retorno das ações de usuário
    loginForm.attr("action", "/login?returnTo=" + encodeURIComponent(location.href));
    logoutForm.attr("action", "/logout?returnTo=" + encodeURIComponent(location.href));
});
