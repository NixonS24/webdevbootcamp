"use strict";

//Base Packages
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"), //needs to be before passport.
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride   = require("method-override"),
//Models - I am not sure if these need to be imported here
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds"),
//Routes
    commentRoutes   = require("./routes/comment"),
    campgroundRoutes= require("./routes/campgrounds"),
    indexRoutes     = require("./routes/index"); //general name for routes that have clear association
    
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
console.log(process.env.DATABASEURL);
mongoose.connect(url);
//This is not good coding practice to have a backup in case our server breaks


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); //This automatically loads 
app.use(methodOverride("_method"));
app.use(flash()); //enable flash
//seedDB(); //seed the database


//PASSPORT CONFIGURATOIN
app.use(require("express-session")({
    secret: "This is the encyrption key that can be anything",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Enable the contents to be accessed in all pages, quite often used in conjunctin with header and footers
app.use(function(req, res, next) {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.currentUser = req.user;
    next(); //This allows the code to execute after our middlware
});

//ROUTES
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes); //This allows us to refactor our campground.js because 'campgrounds' will now be appended to each url page, does make it nice for RESTFul Route
app.use("/campgrounds/:id/comments", commentRoutes); //Because this is accessing the comment id from our req.params we need to add 'mergeParams:true' into our express.Router on the page


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});