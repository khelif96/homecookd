/*jshint esversion: 6 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var foodTypeSchema = new Schema ({
	type: String
});

module.exports = mongoose.model('Food Type', foodTypeSchema);

