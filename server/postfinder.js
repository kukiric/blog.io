/// @ts-check
const e = require("./entities.js");

/**
 * Número de ítens a serem retornados por página
 */
const ITEMS_PER_PAGE = 10;

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
                attributes: [ "title", "content", "createdAt", "creatorId" ],
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
            return result;
        }
        catch(err) {
            console.error(err.stack);
            return null;
        }
    },

    /**
     * Retorna até N posts de forma paginada, do mais recente para o mais antigo
     * @param {number} page Número da página
     * @param {boolean} short Se os posts devem ser retornado em forma reduzida (apenas até o final do primeiro parágrafo)
     * @see ITEMS_PER_PAGE Número de ítens por página
     */
    getMostRecentPaged: async function(page, short) {
        try {
            let limit = ITEMS_PER_PAGE, offset = ITEMS_PER_PAGE * page;
            let results = await e.Post.findAll({
                limit: limit,
                offset: offset,
                attributes: [ "title", "content", "createdAt", "creatorId" ],
                include: [
                    { model: e.User, as: "creator", attributes: [ "fullName" ] },
                    { model: e.Comment, attributes: [ "creator", "content", "createdAt" ] }
                ],
                order: [
                    [ "createdAt", "desc" ]
                ]
            });
            let tableSize = await e.Post.count();
            // Reduz o tamanho do corpo de texto dos posts se necessária abreviação
            if (short) {
                results = results.map(item => {
                    let previousLength = item.content.length;
                    item.content = shorten(item.content);
                    item.isLong = item.content.length < previousLength;
                    return item;
                });
            }
            // Adiciona marcador de última página e remove o id do usuário antes de retornar
            return {
                data: results.map(item => { item.creatorId = undefined; return item; }),
                isLastPage: results.isLastPage = offset + limit >= tableSize
            };
        }
        catch(err) {
            console.error(err.stack);
            return null;
        }
    }
};
