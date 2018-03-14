import QueryParser from "./queryparser.js";
import $ from "jquery";

const errors = {
    login: "O usuário informado não existe ou a senha está incorreta."
};

$(document).ready(() => {
    let loginForm = $("#login-form");
    // Exibe mensagem de erro se necessário
    let queryParser = new QueryParser(window);
    let errorType = queryParser.getQueryParam("err");
    if (errorType != undefined) {
        loginForm.popover({
            content: errors[errorType],
            placement: "bottom"
        });
        loginForm.delay(200).popover("show");
        $("#login-form > input").on("focus", () => loginForm.popover("dispose"));
        // Remove o parâmetro para não continuar na próxima página
        history.replaceState({}, document.title, queryParser.getURIWithoutQueryParam("err"));
    }
});
