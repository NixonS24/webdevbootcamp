var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String,
   description: String,
   author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },      
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
//I think this is a nested NoSQL type of structure but not a hundred percent sure




//Model Creation
var Campground = mongoose.model('Campground', campgroundSchema);
module.exports = Campground;