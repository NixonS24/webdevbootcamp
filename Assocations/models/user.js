//USER Schema - email, name
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Post" //corresponds to the Post in another file
        }
    ] 
});
var User = mongoose.model("User", userSchema);
module.exports = User;
