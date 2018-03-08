import $ from "jquery";
import Cookies from "js-cookie";

window.$user = {
    name: Cookies.get("name")
};

function onLogin() {
    let form = $("#login-form").get(0);
    let formData = new FormData(form);
    Cookies.set("name", formData.get("name"));
}

function onLogout() {
    Cookies.remove("name");
    location.reload(true);
}

$(document).ready(() => {
    // Exibe o usuário logado se ele existir
    if (window.$user.name) {
        $("#user-widget").removeClass("no-display");
        $("#user-name").text(window.$user.name);
    }
    else {
        $("#login-form").removeClass("no-display");
    }
    // Evento de login
    $("#login-form").on("submit", onLogin);
    // Evento de logout
    $("#logout-btn").on("click", onLogout);
});
