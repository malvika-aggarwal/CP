var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gallerySchema = new Schema({
	fileUrl: {
		type: String,
		unique: true,
		required: true
    },
    fileType: {
        type: String,
        enum: ['Image','Video'],
        default: 'Image'
    },
	description: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true,
        unique: true
    },
    language: {
        type: String,
        enum: ['English','French','Both'],
        default: 'English'
    },
	isDeleted: {
		type: Boolean,
		default: false
	}
});


module.exports = mongoose.model('gallery', gallerySchema);