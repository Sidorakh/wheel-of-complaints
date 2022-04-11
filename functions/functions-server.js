class FunctionsHTTPServer {
    routes = {
        get: [],
        patch: [],
        post: [],
        put: [],
        delete: [],
    }
    get(path,/** @type {(functions.https.Request,functions.https.Response)=>void | Promise<void>} */...handler) {
        
    }
}