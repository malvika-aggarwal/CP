/**place all the router files here to keep the code clean and pass router object to every files */
module.exports = function (router) {
    return {
        adminRoutes: require('./adminReg')(router),
    };
}