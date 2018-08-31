var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	roles: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Roles'
	},
	displayName: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	lastLoginTime: {
		type: Date
	},
	is_deleted: {
		type: Boolean,
		default: false
	}
});


module.exports = mongoose.model('User', UserSchema);