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
        unique: true
    },
    alignment: {
        type: String,
        enum: ['Left','Right','Top','Bottom'],
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


module.exports = mongoose.model('WhatWeDo', WhatWeDoSchema);