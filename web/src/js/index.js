import $ from "jquery";

$(document).ready(() => {
    // Exibe mensagem de teste se a página for carregada corretamente
    $("#msg").text("API em uso: " + window.apiPath);
});
