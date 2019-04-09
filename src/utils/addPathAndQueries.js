export const addPathAndQueries = (url, path, queries) => {
    if (path) {
        url += path;
    }
    if (queries.length === 0) {
        return url;
    }
    return url + "?" + queries.map(({param, query}) => `${param}=${query}`).join("&");
};
