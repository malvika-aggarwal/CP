var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GoalsSchema = new Schema({
	title: {
		type: String,
		unique: true,
		required: true
	},
	description: {
        type: String,
        required: true
    },
    sequence: {
        type: Number,
        required: true,
        unique: true
    },
    language: {
        type: String,
        enum: ['English','French'],
        default: 'English'
    },
	isDeleted: {
		type: Boolean,
		default: false
	}
});


module.exports = mongoose.model('Goals', GoalsSchema);