/// @ts-check
const e = require("./entities.js");
const moment = require("moment");

/**
 * Reduz o texto até o final do primeiro parágrafo, ignorando linhas que começam com # (título)
 * @param {string} text Texto a ser reduzido
 * @returns {string}
 */
function shorten(text) {
    const regex = /(\s*)(#.+\n+)?((.+\n?)+$)/m;
    let matches = regex.exec(text);
    return matches[0] || text;
}

/**
 * Retorna um ID de imagem para um devido timestamp de criação para uso no Lorem Picsum
 */
function getImageID(date) {
    let timestamp = moment(date).unix();
    return timestamp % 1085;
}

/**
 * Sobrecarga de {@link shorten} para item do modelo do banco
 * @returns {e.Post}
 */

module.exports = {
    /**
     * Retorna um post do banco
     * @param {number} id ID no banco
     */
    getSinglePost: async function(id) {
        try {
            let result = await e.Post.findOne({
                attributes: [ "id", "title", "content", "createdAt", "creatorId" ],
                include: [
                    { model: e.User, as: "creator", attributes: [ "fullName" ] },
                    { model: e.Comment, attributes: [ "creator", "content", "createdAt" ] }
                ],
                where: {
                    id: id
                }
            });
            // Remove o id do usuário antes de retornar
            result.creatorId = undefined;
            // Define o id da imagem com base na data de criação
            result.image = getImageID(result.createdAt);
            return result;
        }
        catch(err) {
            console.error(err.stack);
            return null;
        }
    },

    /**
     * Retorna posts de forma paginada, do mais recente para o mais antigo
     * @param {number} num Número de ítens por página
     * @param {number} page Número da página
     * @param {boolean} short Se os posts devem ser retornado em forma reduzida (apenas até o final do primeiro parágrafo)
     * @param {string} title Valor a ser buscado no título dos posts
     * @see ITEMS_PER_PAGE Número de ítens por página
     */
    getMostRecentPaged: async function(num, page, short, title) {
        try {
            let limit = num, offset = num * page;
            let where = undefined;
            // Constroi o objeto de busca
            if (title) {
                where = {
                    title: {
                        $iLike: "%" + title + "%"
                    }
                };
            }
            // Realiza a busca
            let results = await e.Post.findAll({
                limit: limit,
                offset: offset,
                attributes: [ "id", "title", "content", "createdAt", "creatorId" ],
                include: [
                    { model: e.User, as: "creator", attributes: [ "fullName" ] },
                    { model: e.Comment, attributes: [ "creator", "content", "createdAt" ] }
                ],
                order: [
                    [ "createdAt", "desc" ]
                ],
                where: where
            });
            let resultSize = await e.Post.count({
                where: where
            });
            // Reduz o tamanho do corpo de texto dos posts se necessária abreviação
            if (short) {
                results = results.map(item => {
                    let previousLength = item.content.length;
                    item.content = shorten(item.content);
                    item.isLong = item.content.length < previousLength;
                    return item;
                });
            }
            // Adiciona marcador de última página, id de imagem, e remove o id do usuário antes de retornar
            return {
                data: results.map(item => {
                    item.creatorId = undefined;
                    item.image = getImageID(item.createdAt);
                    return item;
                }),
                isLastPage: results.isLastPage = offset + limit >= resultSize
            };
        }
        catch(err) {
            console.error(err.stack);
            return null;
        }
    },

    /**
     * Envia um novo post para o banco de dados
     */
    submitPost: async function(title, content, username) {
        try {
            // Encontra o usuário logado
            let user = await e.User.findOne({
                where: {
                    username: username
                }
            });

            // Cria um post novo com o nome dele
            let result = await e.Post.create({
                title: title,
                content: content,
                creatorId: user.id
            });

            return result;
        }
        catch(err) {
            console.error(err.stack);
            return null;
        }
    },

    /**
     * Remove um post do banco
     */
    deletePost: async function(id, username) {
        try {
            // Valida os parâmetros antes da remoçao
            if (id != null && username) {
                let result = e.Post.destroy({
                    where: {
                        id: id
                    },
                    cascade: true
                });
                return result;
            }
            return false;
        }
        catch(err) {
            console.error(err.stack);
            return null;
        }
    }
};
