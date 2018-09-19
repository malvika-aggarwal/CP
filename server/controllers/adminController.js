var user = require('../models/user');
var Entity = require('../models/entities');
var gallery = require('../models/gallery');
var roles = require('../models/roles');
var whatwedo = require('../models/whatwedo');
var whoweare = require('../models/whoweare');
var careersupport = require('../models/careerSupport');
var privacynotice = require('../models/privacyNotice');
var fraudalert = require('../models/fraudAlert');
var Cryptr = require('cryptr');
var {
	secretKey
} = require('../config');
var cryptr = new Cryptr(secretKey);
var helper = require('../generic/helper');
var goals = require('../models/goals');

exports.signUp = (req, res) => {
	var encryptedPassword = cryptr.encrypt(req.body.password);
	var userSchema = new user();
	userSchema.email = req.body.email;
	userSchema.username = req.body.username;
	userSchema.password = encryptedPassword;
	userSchema.displayName = req.body.displayName;
	userSchema.roles = req.body.roles;
	userSchema.save((error, data) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).send(data)
		}
	})
};

exports.logIn = (req, res) => {
	user.findOne({
		$or: [{
			'email': req.body.emailOrUsername
		}, {
			'username': req.body.emailOrUsername
		}],
		is_deleted: false
	}, (error, user) => {
		if (error) {
			res.status(500).send(error.toString());
		} else if (user) {
			var decryptedPasswod = cryptr.decrypt(user.password);
			if (decryptedPasswod === req.body.password) {
				res.status(200).send(user)
			} else {
				res.status(500).send('Password didnt match.');
			}
		} else {
			res.status(500).send('Username/email not exist.');
		}
	});
};

exports.fetchRoles = (req, res) => {
	roles.find({
		is_deleted: false
	}).exec((err, roles) => {
		if (err) {
			res.status(500).send(err.toString());
		} else {
			res.status(200).json(roles);
		}
	})
};

exports.getUsers = (req, res) => {
	user.find({
		is_deleted: false
	}).populate('roles').exec((error, users) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(users);
		}
	});
};

exports.updateUser = (req, res) => {
	user.update({
		_id: req.params.user_id
	}, req.body).exec((error, user) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(user);
		}
	})
};

exports.saveGallery = async (req, res) => {
	var data = await helper.createMedia(req.body.file);
	req.body.fileUrl = data.filePath;
	req.body.fileName = data.filename;
	var json = new gallery(req.body);
	json.save((err, data) => {
		if (err) {
			res.status(500).send(err.toString());
		} else {
			res.status(200).json(data);
		}
	});
};

exports.fetchGallery = (req, res) => {
	gallery.find().exec((err, gallery) => {
		if (err) {
			res.status(500).send(err.toString());
		} else {
			res.status(200).json(gallery);
		}
	})
};

exports.updateGallery = (req, res) => {
	gallery.update({
		_id: req.params.gallery_id
	}, req.body).exec((error, gallery) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(gallery);
		}
	})
};

exports.getParticularGallery = (req, res) => {
	var query = {};
	query.$or = [{
		language: req.params.language
	}, {
		language: 'Both'
	}];
	query.isDeleted = false;
	query.fileType = req.params.type;
	gallery.find(query).exec((err, gallery) => {
		if (err) {
			res.status(500).send(err.toString());
		} else {
			res.status(200).json(gallery);
		}
	});
};

exports.createWhatWeDo = async (req, res) => {
	var json = new whatwedo(req.body);
	json.save((err, data) => {
		if (err) {
			res.status(500).send(err.toString());
		} else {
			res.status(200).json(data);
		}
	})
};

exports.fetchWhatWeDo = (req, res) => {
	whatwedo.find().sort('sequence').exec((error, list) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(list);
		}
	})
};

exports.updateWhatToDo = async (req, res) => {
	whatwedo.update({
		_id: req.params.section_id
	}, req.body).exec((error, section) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(section);
		}
	})
};

exports.fetchWhatWeDoGoals = (req, res) => {
	goals.find().sort('sequence').exec((error, goals) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(goals);
		}
	})
};

exports.createWhatWeDoGoals = (req, res) => {
	var json = new goals(req.body);
	json.save((err, data) => {
		if (err) {
			res.status(500).send(err.toString());
		} else {
			res.status(200).json(data);
		}
	})
};

exports.updateWhatWeDoGoal = (req, res) => {
	goals.update({
		_id: req.params.goal_id
	}, req.body).exec((error, goal) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(goal);
		}
	});
};

exports.getEntities = (req, res) => {
	Entity.find().exec((error, entity) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(entity);
		}
	});
};

exports.saveEntities = (req, res) => {
	var json = new Entity(req.body);
	json.save((error, data) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(data);
		}
	})
};

exports.updateEntities = (req, res) => {
	Entity.update({
		_id: req.params.entity_id
	}, req.body).exec((error, entity) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(entity);
		}
	});
};

exports.createWhoWeAre = (req, res) => {
	var json = new whoweare(req.body);
	json.save((err, data) => {
		if (err) {
			res.status(500).send(err.toString());
		} else {
			res.status(200).json(data);
		}
	})
};

exports.fetchWhoWeAre = (req, res) => {
	whoweare.find().sort('sequence').exec((error, list) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(list);
		}
	})
};

exports.updateWhoWeAre = (req, res) => {
	whoweare.update({
		_id: req.params.section_id
	}, req.body).exec((error, section) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(section);
		}
	})
};

exports.createCareerSupport = (req, res) => {
	var json = new careersupport(req.body);
	json.save((err, data) => {
		if (err) {
			res.status(500).send(err.toString());
		} else {
			res.status(200).json(data);
		}
	})
};

exports.fetchCareerSupport = (req, res) => {
	careersupport.find().sort('sequence').exec((error, list) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(list);
		}
	})
};

exports.updateCareerSupport = (req, res) => {
	careersupport.update({
		_id: req.params.section_id
	}, req.body).exec((error, section) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(section);
		}
	})
}

exports.createPrivacyNotice = (req, res) => {
	var json = new privacynotice(req.body);
	json.save((err, data) => {
		if (err) {
			res.status(500).send(err.toString());
		} else {
			res.status(200).json(data);
		}
	})
};

exports.fetchPrivacyNotice = (req, res) => {
	privacynotice.find().sort('sequence').exec((error, list) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(list);
		}
	})
};

exports.updatePrivacyNotice = (req, res) => {
	privacynotice.update({
		_id: req.params.section_id
	}, req.body).exec((error, section) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(section);
		}
	})
};

exports.createFraudAlert = (req, res) => {
	var json = new fraudalert(req.body);
	json.save((err, data) => {
		if (err) {
			res.status(500).send(err.toString());
		} else {
			res.status(200).json(data);
		}
	})
};

exports.fetchFraudAlert = (req, res) => {
	fraudalert.find().sort('sequence').exec((error, list) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(list);
		}
	})
};

exports.updateFraudAlert = (req, res) => {
	fraudalert.update({
		_id: req.params.section_id
	}, req.body).exec((error, section) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res.status(200).json(section);
		}
	})
};