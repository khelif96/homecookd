/*jshint esversion: 6 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var sellerSchema = new Schema ({
    name: {
        first: String,
        last: String
    },
    password_hash: String,
    email: String,
    userName: String,
    createDate: {
        type: Date,
        default: Date.now()
    },
    profile_img: String, // has to be filled already
    business_name: String,
    business_type: [], // What kind of food they sell
    account_approved: Boolean,
    reviews: [],
    orders: [String],
    food_items_id: [String], // what they sell
    api_token: String,
    location: {
        address: {
            street: String,
            city: String,
            state: String
        },
        lat: Number,
        long: Number
    }
});

module.exports = mongoose.model('Seller',sellerSchema);
