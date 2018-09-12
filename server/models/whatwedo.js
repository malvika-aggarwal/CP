var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WhatWeDoSchema = new Schema({
    heading: {
        type: String 
    },
	description: {
        type: String
    },
    sequence: {
        type: Number,
        required: true,
    },
    alignment: {
        type: String,
        enum: ['Left','Top','Bottom','LeftBottom'],
        default: 'Left'
    },
    descriptionType: {
        type: String,
        enum: ['Text','Image','Video'],
        default: 'Text'
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


WhatWeDoSchema.index({ "sequence": 1, "language": 1, "isDeleted":1}, { "unique": true });


module.exports = mongoose.model('WhatWeDo', WhatWeDoSchema);