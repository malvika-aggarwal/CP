var whatwedo = require('../models/whatwedo');
var goals = require('../models/goals');
var entity = require('../models/entities');
var whoweare = require('../models/whoweare');

exports.fetchWhatWeDo = (req, res) => {
	var language = 'English';
	if (req.query.lang && req.query.lang === 'French') {
		language = req.query.lang;
	}
	whatwedo.find({
		isDeleted: false,
		language
	}).sort('sequence').exec((error, list) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(list);
		}
	})
};

exports.fetchGoals = (req, res) => {
	var language = 'English';
	if (req.query.lang && req.query.lang === 'French') {
		language = req.query.lang;
	}
	goals.find({
		isDeleted: false,
		language
	}).sort('sequence').exec((error, goals) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(goals);
		}
	})
};

exports.fetchEntities = (req, res) => {
	var language = 'English';
	if (req.query.lang && req.query.lang === 'French') {
		language = req.query.lang;
	}
	entity.find({
		isDeleted: false,
		language
	}).exec((error, entity) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(entity);
		}
	})
};

exports.fetchWhoWeAre = (req, res) => {
	var language = 'English';
	if (req.query.lang && req.query.lang === 'French') {
		language = req.query.lang;
	}
	whoweare.find({
		isActive: true,
		language
	}).exec((error, whoweare) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(whoweare);
		}
	})
};