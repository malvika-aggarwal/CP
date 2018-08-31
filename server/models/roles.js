var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserRolesSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	description: {
		type: String
	},
	is_deleted: {
		type: Boolean,
		default: false
	}
});


module.exports = mongoose.model('Roles', UserRolesSchema);