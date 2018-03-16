"use strict";

/**
 * @param {JQuery} parent
 * @param {boolean} enabled
 */
function setEditorMode(parent, enabled) {
    if (enabled) {
        parent.find(".editor-on").removeClass("d-none");
        parent.find(".editor-off").addClass("d-none");
    }
    else {
        parent.find(".editor-on").addClass("d-none");
        parent.find(".editor-off").removeClass("d-none");
    }
}

$(document).ready(() => {
    // Ativa os elementos do modo administrador em cada post
    $(".post").each((index, element) => {
        let post = $(element);
        // Conecta os event handlers dos botões
        post.find("button[data-tag='edit']").on("click", () => {
            setEditorMode(post, true);
        });
        post.find("button[data-tag='cancel']").on("click", () => {
            setEditorMode(post, false);
        });
    });
});