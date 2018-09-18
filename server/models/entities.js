var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EntitiesSchema = new Schema({
    fileUrl: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        enum: ['Image', 'Video'],
        default: 'Image'
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        enum: ['English', 'French'],
        default: 'English'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('Entities', EntitiesSchema);