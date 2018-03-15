"use strict";

$(document).ready(() => {
    // Ativa os elementos do modo administrador para o novo post
    let button = $("#new-button");
    let form = $("#new-post");
    button.on("click", () => {
        button.prop("disabled", "disabled");
        button.removeClass("btn-outline-success");
        button.addClass("btn-outline-secondary");
        form.removeClass("d-none");
        form.find("input[name='title']").focus();
    });
});