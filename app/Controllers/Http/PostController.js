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

    // Lista apenas os posts mais recentes
    async home({ view }) {
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

    // Lista uma página do catálogo de posts
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

    // Lista um post por ID
    async get({ params, view }) {
        try {
            // BUG: post.with() e post.user().load() (eager-loading) não geram o join no select, necessitando a busca manual do usuário
            let post = await Post.find(params.id);
            let user = await post.user().fetch();
            let postData = post.toJSON();
            let userData = user.toJSON();
            postData.full_name = userData.full_name;

            return view.render("posts", {
                header: `Posts - ${post.title}`,
                pageName: post.title,
                posts: [postData],
                isLastPage: true,
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

    // Envia um novo post
    async post({ request, auth, response }) {
        try {
            let user = await auth.getUser();
            let body = request.post();
            await Post.create({
                title: body.title,
                content: body.content,
                user_id: user.id
            });
            response.redirect("back");
        }
        catch (error) {
            return error.message;
        }
    }

    // Atualiza um post existente
    async update({ request, response }) {
        response.redirect("back");
    }

    // Remove um post do sistema
    async delete({ request, response }) {
        response.redirect("back");
    }
}

module.exports = PostController;
