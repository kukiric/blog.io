"use strict";

const Post = use("App/Models/Post");
const md = use("markdown").markdown;
const moment = use("moment");

/**
 * @param {string} text Texto a ser formatado
 * @param {boolean} shortText Retorna somente o primeiro parágrafo
 */
function markdown(text, shortText) {
    let html = md.toHTML(text);
    return html;
}

/**
 * Formata uma data como DD/MM/AAAA
 * @param {*} date Data
 */
function dateTime(date) {
    return moment(date).locale("pt-br").format("L");
}

/**
 * @param {number} timestamp Horário de criação do post para geração do ID
 */
function imageId(timestamp) {
    let id = moment(timestamp).unix() % 1047;
    return id;
}

class PostController {
    async home({ request, view }) {
        // Busca os posts no banco
        let posts = await Post.getRecent(0, 5);

        return view.render("posts", {
            header: "Posts recentes",
            pageName: "Home",
            homeActive: "active",
            isLastPage: posts.isLastPage,
            posts: posts.data,
            shortText: true,
            markdown,
            dateTime,
            imageId
        });
    }

    async list({ request, view }) {
        // Força a página a ser um número válido
        let page = parseInt(request.get().page);
        page = page > 0 ? page : 1;

        // Busca o parâmetro de pesquisa
        let search = request.get().q;

        // Busca os posts no banco
        let posts = await Post.getRecent(page - 1, 5, search);

        return view.render("posts", {
            header: `Posts - Página ${page}`,
            pageName: "Posts",
            posts: posts.data,
            isLastPage: posts.isLastPage,
            postsActive: "active",
            shortText: false,
            page,
            markdown,
            dateTime,
            imageId
        });
    }

    async get({ params, view }) {
        try {
            let post = await Post.find(params.id);
            return view.render("posts", {
                header: `Posts - ${post.title}`,
                pageName: post.title,
                posts: [post],
                postsActive: "active",
                shortText: false,
                markdown,
                dateTime,
                imageId
            });
        }
        catch (error) {
            return error.message;
        }
    }

    async post({ request, response }) {
        return "401";
    }

    async update({ request, response }) {
        return "401";
    }

    async delete({ request, response }) {
        return "401";
    }
}

module.exports = PostController;
