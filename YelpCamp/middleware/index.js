//This is where all the general middleware sits
//We can refactor out the middlware into individual files if you want 
//i.e. campground.js & comment.js but as there is only one probably not worth it

//Models
var Campground      = require("../models/campground");
var Comment         = require("../models/comment");

var middlewareObject = {};

//Check campgroundOnwership
middlewareObject.checkCampgroundOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(error, foundCampground){
            if(error || !foundCampground){
                //console.log(error);
                req.flash("error", "Campground not found");
                res.redirect("/campgrounds");
            } else {
                //does user own campground
                //console.log(foundCampground.author.id) //- this is a mongoose object
                //console.log(req.user._id) //- this is a string, therefore comparision above will not work unless we use mongoose method
                if(foundCampground.author.id == undefined || foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You do not have permission to edit Campground");
                    res.redirect("back");
                }
            }
        });    
    } else {
        res.flash("error", "You need to be Logged In");
        res.redirect("back");
    }
}

//check comment onwership
middlewareObject.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(error, foundComment){
            if(error || !foundComment){
                //console.log(error);
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                //does user own campground
                //console.log(foundComment) //- this is a mongoose object
                //console.log(req.user._id) //- this is a string, therefore comparision above will not work unless we use mongoose method
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You do not have permission to edit Comment");
                    res.redirect("back");
                }
            }
        });    
    } else {
        res.flash("error", "You need to be Logged In");
        res.redirect("back");
    }
}

//This can be injected in any route as middleware
middlewareObject.isLoggedIn = function(req, res, next){
    //This is standard for middleware to take three arguments
    if(req.isAuthenticated()){ //This is method available with passport
        return next();
    } //Don't need else because we are using return statement
    req.flash("error", "Please Login First"); //Won't be displayed until the next thing we see
    res.redirect("/login");
}



module.exports = middlewareObject;