var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var careerSupportSchema = new Schema({
    description: {
        type: String
    },
    sequence: {
        type: Number,
        required: true,
    },
    alignment: {
        type: String,
        enum: ['Left', 'Top', 'Bottom'],
        default: 'Left'
    },
    descriptionType: {
        type: String,
        enum: ['Text', 'Image', 'Video'],
        default: 'Text'
    },
    language: {
        type: String,
        enum: ['English', 'French'],
        default: 'English'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedOn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

careerSupportSchema.index({
    "sequence": 1,
    "language": 1,
    "isActive": 1
}, {
    "unique": true
});


module.exports = mongoose.model('CareerSupport', careerSupportSchema);