'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DrugSchema = new Schema({
    name: String,
    price: Number,
    active: Boolean,
    active_ingredient: String,
    //timeStamp: new Date()
});

module.exports = mongoose.model('Drug', DrugSchema);
