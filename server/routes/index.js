/**place all the router files here to keep the code clean and pass router object to every files */
module.exports = function (router) {
    return {
        adminRoutes: require('./adminRoutes')(router),
        publicRoutes: require('./publicRoutes')(router),
    };
}