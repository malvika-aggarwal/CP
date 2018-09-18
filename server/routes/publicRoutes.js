var publicCtrl = require('../controllers/publicController');

module.exports = function (router) {
    router.route('/getWhatWeDoList')
        .get(publicCtrl.fetchWhatWeDo);
    router.route('/getGoals')
        .get(publicCtrl.fetchGoals);
    router.route('/getEntities')
        .get(publicCtrl.fetchEntities);
    router.route('/getWhoWeAreList')
        .get(publicCtrl.fetchWhoWeAre)
}