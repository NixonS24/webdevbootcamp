var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);
//This adds a lot methods to our schema which we then export below
module.exports = mongoose.model("User", UserSchema);


