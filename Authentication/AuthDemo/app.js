var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"), //This is a local file
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")
    
    
mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true})); //Our body parsing middlware which helps us handle post requests

app.use(require("express-session")({
    secret: "This is the encryption key and can be anything",
    resave: false,
    saveUninitialized: false
}));

//This two methods are required anytime we use passport
app.use(passport.initialize());
app.use(passport.session());

//We are using LocalStragety imported above, and then a method we have installed in our Plugin on user.js
passport.use(new LocalStrategy(User.authenticate()));

//Responsible for encoding and decoding the data (I think this has to do with passports)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//ROUTES

//RESTFUL ROUTES

app.get("/", function(req, res){
    res.render('home');
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render('secret');
    //IsLoggedIn is defined further below
});

//AUTH ROUTES

app.get("/register", function(req, res){
    res.render('register');
});

app.get("/register", function(req, res){
   res.render("register"); 
});

app.post("/register", function(req, res){
    //we only pass in username, because we don't save the password to the datebase (its becomes a second arguemnt which is then hashed)
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            //If there is an error need to try again
            return res.render('register'); //not quite sure why this is 'return', not seen this usage before
        } 
            //I am also not sure why this is not an else statement - but I assume it is because we have a return statement just above
            //This will log the user and store the correct information
            //The information in the brackets - 'local' is the stragety, it is relatively easy to swap stragety ie 'facebook' for social login
            passport.authenticate("local")(req, res, function(){
                //res.render("secret");
                res.redirect("secret");
            });
    });
});

//LOGIN ROUTES
//Render Login Forms
app.get("/login", function(req, res){
    res.render("login");
});

//Login logic
//app.post(route, middlware, callback)
//This middleware - is code that runs before the end of our our route
app.post("/login", passport.authenticate("local", {
    //This tries to login you in by comparing passwords.
    //We then provide an object with parameters
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,function(req, res){
   //Callback function can be empty because breackage are above
   //In fact I think we could actually get rid of this if we wanted to
});

app.get("/logout", function(req,res){
    req.logout(); //This will stop express keeping track of the user from session to session
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    //This is standard for middleware to take three arguments
    if(req.isAuthenticated()){ //This is method available with passport
        return next();
    } //Don't need else because we are using return statement
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started.......");
})