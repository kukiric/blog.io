import $ from "jquery";

$(document).ready(() => {
    // Ativa os elementos do modo administrador
    if (window.username) {
        let button = $("#new-button");
        let form = $("#new-post");
        // Exibe o formulário ao clicar no botão de novo post
        button.on("click", () => {
            button.prop("disabled", "disabled");
            button.removeClass("btn-outline-success");
            button.addClass("btn-outline-secondary");
            form.removeClass("d-none");
            form.find("input[name='title']").focus();
        });
    }
});