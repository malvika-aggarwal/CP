var publicCtrl = require('../controllers/publicController');

module.exports = function (router) {
    router.route('/getWhatWeDoList')
        .get(publicCtrl.fetchWhatWeDo);
    router.route('/getGoals')
        .get(publicCtrl.fetchGoals);
}