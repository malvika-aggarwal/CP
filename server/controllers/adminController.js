var user = require('../models/user');
var roles = require('../models/roles');
var whatwedo = require('../models/whatwedo');
var Cryptr = require('cryptr');
var { secretKey } = require('../config');
var cryptr = new Cryptr(secretKey);
var helper = require('../generic/helper');

exports.signUp = (req, res) => {
	var encryptedPassword = cryptr.encrypt(req.body.password);
	var userSchema = new user();
	userSchema.email = req.body.email;
	userSchema.username = req.body.username;
	userSchema.password = encryptedPassword;
	userSchema.displayName = req.body.displayName;
	userSchema.roles = req.body.roles;
	userSchema.save((error, data) => {
		if(error){
			res.status(500).send(error.toString());
		}else{
			res.status(200).send(data)
		}
	})
};

exports.logIn = (req, res) => {
	user.findOne( { $or:[ {'email':req.body.emailOrUsername}, {'username':req.body.emailOrUsername} ],is_deleted:false }, (error,user) => {
		if(error){
			res.status(500).send(error.toString());
		}else if(user){
			var decryptedPasswod = cryptr.decrypt(user.password);
			if(decryptedPasswod===req.body.password){
				res.status(200).send(user)
			}else{
				res.status(500).send('Password didnt match.');
			}
		}else{
			res.status(500).send('Username/email not exist.');
		}
	});
};

exports.fetchRoles = (req, res) => {
	roles.find({ is_deleted: false }).exec((err,roles) => {
		if(err){
			res.status(500).send(err.toString());
		}else{
			res.status(200).json(roles);
		}
	})
};

exports.getUsers = (req,res) => {
	user.find({ is_deleted: false }).populate('roles').exec((error,users) => {
		if(error){
			res.status(500).send(error.toString());
		}else{
			res.status(200).json(users);
		}
	});
};

exports.updateUser = (req,res) => {
	user.update({_id:req.params.user_id}, req.body).exec((error,user) => {
		if(error){
			res.status(500).send(error.toString());
		}else{
			res.status(200).json(user);
		}
	})
};

exports.createWhatWeDo = async(req, res) => {
	if(req.body.descriptionType=='Image' || req.body.descriptionType=='Video'){
		req.body.description = await helper.createMedia(req.body.file);
		delete req.body.file;
	}
	var json = new whatwedo(req.body);
	json.save((err,data)=>{
		if(err){
			res.status(500).send(err.toString());
		}else{
			res.status(200).json(data);
		}
	})
};

exports.fetchWhatWeDo = (req,res) => {
	whatwedo.find().sort('sequence').exec((error,list) => {
		if(error){
			res.status(500).send(error.toString());
		}else{
			res.status(200).json(list);
		}
	})
};

exports.updateWhatToDo = async (req,res) => {
	if((req.body.descriptionType=='Image' || req.body.descriptionType=='Video') && req.body.file){
		req.body.description = await helper.createMedia(req.body.file);
		delete req.body.file;
	}

	whatwedo.update({_id:req.params.section_id}, req.body).exec((error,section) => {
		if(error){
			res.status(500).send(error.toString());
		}else{
			res.status(200).json(section);
		}
	})
}