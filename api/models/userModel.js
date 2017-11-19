(function () {
    'use strict';
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;


    var UserSchema = new Schema({
        name: {
            type: String,
            required: 'Please enter name'
        },
        surname: {
            type: String,
            required: 'Please enter surname'
        },
        age: {
            type: Number,
            required: 'Please enter age'
        },
        city: {
            type: String,
            required: 'Please enter city'
        },
        Created_date: {
            type: Date,
            default: Date.now
        },
        gender: {
            type: [{
                type: String,
                enum: ['male', 'female', 'other']
            }],
            default: ['male']
        }
    });

    module.exports = mongoose.model('Users', UserSchema);
})();

