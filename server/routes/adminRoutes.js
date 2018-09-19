var adminCtrl = require('../controllers/adminController');

module.exports = function (router) {
    /**
     * User Routes
     */
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

    /**
     * Gallery Routes
     */
    router.route('/saveGallery')
        .post(adminCtrl.saveGallery);
    router.route('/fetchGallery')
        .get(adminCtrl.fetchGallery)
    router.route('/updateGallery/:gallery_id')
        .put(adminCtrl.updateGallery);
    router.route('/getParticularGallery/:type/:language')
        .get(adminCtrl.getParticularGallery);

    /**
     * What we do Routes
     */
    router.route('/saveWhatWeDo')
        .post(adminCtrl.createWhatWeDo)
    router.route('/getSectionForWhatWeDo')
        .get(adminCtrl.fetchWhatWeDo)
    router.route('/updateSectionWhatWeDo/:section_id')
        .put(adminCtrl.updateWhatToDo)
    router.route('/getWhatWeDoGoals')
        .get(adminCtrl.fetchWhatWeDoGoals)
    router.route('/saveWhatWeDoGoals')
        .post(adminCtrl.createWhatWeDoGoals)
    router.route('/updateWhatWeDoGoal/:goal_id')
        .put(adminCtrl.updateWhatWeDoGoal);
    router.route('/getAllEntities')
        .get(adminCtrl.getEntities)
    router.route('/saveEntities')
        .post(adminCtrl.saveEntities)
    router.route('/updateEntities/:entity_id')
        .put(adminCtrl.updateEntities)

    /**
     * Who We Are Routes
     */
    router.route('/saveWhoWeAre')
        .post(adminCtrl.createWhoWeAre);
    router.route('/getSectionsForWhoWeAre')
        .get(adminCtrl.fetchWhoWeAre)
    router.route('/updateSectionWhoWeAre/:section_id')
        .put(adminCtrl.updateWhoWeAre)

    /** 
     * Career Support Routes 
     */
    router.route('/saveCarrerSupport')
        .post(adminCtrl.createCareerSupport);
    router.route('/getSectionsForCareerSupport')
        .get(adminCtrl.fetchCareerSupport)
    router.route('/updateSectionCareerSupport/:section_id')
        .put(adminCtrl.updateCareerSupport)

    /** 
     * Privacy Notice Routes 
     */
    router.route('/savePrivacyNotice')
        .post(adminCtrl.createPrivacyNotice);
    router.route('/getSectionsForPrivacyNotice')
        .get(adminCtrl.fetchPrivacyNotice)
    router.route('/updateSectionPrivacyNotice/:section_id')
        .put(adminCtrl.updatePrivacyNotice)

    /** 
     * Fraud Alert Routes 
     */
    router.route('/saveFraudAlert')
        .post(adminCtrl.createFraudAlert);
    router.route('/getSectionsForFraudAlert')
        .get(adminCtrl.fetchFraudAlert)
    router.route('/updateSectionFraudAlert/:section_id')
        .put(adminCtrl.updateFraudAlert)
}