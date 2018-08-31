var user = require('../models/user');
var roles = require('../models/roles');
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
	//console.log("req.body.file=============================================",req.body.file)
	var filePath = await helper.createMedia(req.body.file);
console.log("---------------------teraf--------",filePath);
};