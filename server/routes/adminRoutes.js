var adminCtrl = require('../controllers/adminController');

module.exports = function (router) {
    router.route('/signup')
        .post(adminCtrl.signUp);
    router.route('/login')
        .post(adminCtrl.logIn);
    router.route('/users')
        .get(adminCtrl.getUsers);
    router.route('/updateUser/:user_id')
        .put(adminCtrl.updateUser);
    router.route('/roles')
        .get(adminCtrl.fetchRoles);
    router.route('/saveWhatWeDo')
        .post(adminCtrl.createWhatWeDo)
    router.route('/getSectionForWhatWeDo')
        .get(adminCtrl.fetchWhatWeDo)
    router.route('/updateSectionWhatWeDo/:section_id')
        .put(adminCtrl.updateWhatToDo)
        
}