import $ from "jquery";
import "bootstrap";

$(document).ready(() => {
    // Exibe mensagem de teste se a página for carregada corretamente
    $("#alert").removeClass("alert-dark").addClass("alert-success").text("API em uso: " + window.apiPath);
});
