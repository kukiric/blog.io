import $ from "jquery";

$(document).ready(() =>{
    // Exibe o usuário logado se ele existir
    if (window.$user) {
        $("#user-widget").removeClass("no-display");
        $("#user-name").text(window.$user.name);
    }
    else {
        $("#login-form").removeClass("no-display");
    }
});
