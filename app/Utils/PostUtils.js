const md = use("markdown").markdown;
const moment = use("moment");

module.exports = {
    /**
     * Reduz o texto até o final do primeiro parágrafo
     * @param {string} text Texto a ser reduzido
     * @returns {string}
     */
    shorten: function(text) {
        const regex = /(\s*)(#.+\n+)?((.+\n?)+$)/m;
        let matches = regex.exec(text);
        return matches[0] || text;
    },

    /**
     * Retorna se o texto é mais longo que um parágrafo
     * @param {string} text
     * @returns {string}
     */
    isLong: function(text) {
        return text.length > this.shorten(text).length;
    },

    /**
     * @param {string} text Texto a ser formatado
     * @param {boolean} shortText Retorna somente o primeiro parágrafo
     */
    markdown: function(text) {
        let html = md.toHTML(text);
        return html;
    },

    /**
     * Formata uma data como DD/MM/AAAA
     * @param {*} date Data
     */
    dateTime: function(date) {
        return moment(date).locale("pt-br").format("L");
    },

    /**
     * @param {number} timestamp Horário de criação do post para geração do ID
     */
    imageId: function(timestamp) {
        let id = moment(timestamp).unix() % 1047;
        return id;
    }
};