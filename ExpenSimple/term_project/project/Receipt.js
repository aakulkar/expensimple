//Receipt schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Receipt = new Schema({
    name: String,
    date: Number,
    user: String,
    amount: Number,
    tags: [String],
    photo: String
});

//User.plugin(passportLocalMongoose); //adds username, password to schema

module.exports = mongoose.model('Receipt', Receipt);
