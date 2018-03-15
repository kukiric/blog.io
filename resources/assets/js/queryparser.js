function getRegexForParam(param) {
    return new RegExp(`(.*[?&])${param}=([^&]+)&?(.*)`);
}

export default class QueryParser {

    constructor(window) {
        this.window = window;
    }

    getQueryParam(param) {
        let re = getRegexForParam(param);
        let query = this.window.location.search;
        let matches = re.exec(query);
        // Retorna o segundo grupo contendo o valor do parâmetro
        if (matches) {
            return decodeURIComponent(matches[2]);
        }
        else {
            return undefined;
        }
    }

    getURIWithoutQueryParam(param) {
        let re = getRegexForParam(param);
        let uri = this.window.location.pathname;
        let query = this.window.location.search;
        let matches = re.exec(query);
        // Retorna a URI original sem o parâmetro
        if (matches) {
            // Remove a query se não houver mais nenhum parâmetro
            if (matches[1] == "?" && matches[3] == "") {
                return uri;
            }
            else {
               return uri + matches[1] + matches[3];
            }
        }
        else {
            return uri + query;
        }
    }
};
