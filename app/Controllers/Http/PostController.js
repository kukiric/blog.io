"use strict";

const Post = use("App/Models/Post");
const PostUtils = use("App/Utils/PostUtils");

class PostController {

    // Lista apenas os primeiros 5 posts mais recentes
    async home({ view }) {
        // Busca os posts no banco
        let posts = await Post.getRecent(1, 5);

        return view.render("posts", {
            header: "Posts recentes",
            pageName: "Home",
            homeActive: "active",
            isLastPage: posts.isLastPage,
            posts: posts.data,
            shortText: true,
            utils: PostUtils
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
        let posts = await Post.getRecent(page, 5, search);

        return view.render("posts", {
            header: `Posts - Página ${page}`,
            pageName: "Posts",
            posts: posts.data,
            isLastPage: posts.isLastPage,
            postsActive: "active",
            shortText: false,
            utils: PostUtils,
            page
        });
    }

    // Lista um único post por ID
    async get({ params, view }) {
        try {
            let post = await Post.query()
                .where("id", params.id)
                .with("user")
                .limit(1)
                .fetch();

            return view.render("posts", {
                header: `Posts - ${post.title}`,
                pageName: post.title,
                posts: post.toJSON(),
                isLastPage: true,
                postsActive: "active",
                shortText: false,
                utils: PostUtils
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
    async update({ params, request, auth, response }) {
        try {
            await auth.check();
            let post = await Post.find(params.id);
            let body = request.post();
            post.title = body.title;
            post.content = body.content;
            await post.save();
            response.redirect("back");
        }
        catch(error) {
            return error.message;
        }
    }

    // Remove um post do sistema
    async delete({ params, auth, response }) {
        try {
            await auth.check();
            let post = await Post.find(params.id);
            await post.delete();
            response.redirect("back");
        }
        catch(error) {
            return error.message;
        }
    }
}

module.exports = PostController;
