var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,

});