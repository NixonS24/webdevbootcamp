var express = require("express");
var router  = express.Router();
var passport = require("passport")

//Models
var User = require("../models/user");

//Midleware
var middleware = require("../middleware");

//Landing Route
router.get("/", function(req, res){
    res.render("landing");
});

//AUTH ROUTE

//Show register form
router.get("/register",function(req,res){
   res.render("register");
});

//handle signup logic
router.post("/register",function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            res.redirect("register"); 
        } else {
            passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
            });
        }
    });
});

//LOGIN ROUTES
//Render Login Forms
router.get("/login", function(req, res){
    res.render("login");
});


//Login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req, res){
   //Empty because breakage above
});

//Logout Rotue
router.get("/logout", function(req,res){
    req.logout(); 
    req.flash("error", "Logged you out");
    res.redirect("/campgrounds");
});

//test Image Route
router.get("/image", function(req, res){
    res.render("image");
});

module.exports = router;