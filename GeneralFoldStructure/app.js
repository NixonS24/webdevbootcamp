// Requires Express, Mongoose, Database(MongoDB),Body_Parser, Method Overide

"use strict"; 
//Restricts usages that come from incorrect global/local declaration to best practice

//Require packages
var express         = require('express'),       //Base Framework that provides layer of functionality on top of node.js (routes, servers and database)
    app             = express(),
    bodyParser      = require('body-parser'),   //Parse incoming requests (i.e. your post requests) into middleware (easy to use frameworks)
    mongoose        = require('mongoose'),      //Adds a javascript layer over our database (mongodb) and creates base functionality
    methodOverride  = require("method-override"); //Provides a middleware that adds a level of functinality to items that can only use "get" or "post" requests - i.e. for forms


//Configure Usage
//This enviromental variables needs to be configured 
var url = process.env.DATABASEURL || "mongodb://localhost/INSERTNAME"; //Local Database Requires MongoDB to be running - and it will create database of this name if one does not exist
console.log(process.env.DATABASEURL);
mongoose.connect(url);              //The code directly above gives us a backup in case our enviroment variables is not working. 
//Enviorment variables are setup directly with heroku dashboard and local through terminal command "export DATABASEURL=mongodb://localhost/$databsename"

app.use(bodyParser.urlencoded({extended: true}));    //Connfigures the usage of app to automatically use Body-Parser as its middleware
app.use(express.static(__dirname + "/public"));     //Automatically load assets in public folder for use, file paths for assets are automtically looking in public so usuallu just need "/image/logo.png"
app.set("view engine","ejs");                       //Sets all file in Folder Views to type ".ejs" which means you can drop this from your render string
app.use(methodOverride("_method"));                 //Tells the method app - to use the middleware when it sees the string "_method"

//DATABASES

//Schema Setup & Model Creation from import
var Model = require("./models/modelExample")

//Routes 
//indexRoutes = require("./routes.index");

//Initial Test Data for DB (which forces your database to be created - should be deleted after initial use)
//This could potentially be refactored into a seeds template, which could autmotically delete seed comments 
Model.create({
    name: "Sam",
    age: 24
}, function(error, newDataBaseEntry){
    if (error){
        console.log(error)
    } else {
        console.log('Database Entry')
        console.log(newDataBaseEntry)
    }
});

//AUTHENTICATION 

//Requires a bit of work 
//Add packages express-sessions, passport, passport-local, passport-local-mongoose
//Require packages, and then add 8-10 lines of code (refer to authentication section 'app.js')

//RESTFul Routes - in order - general this will be refactored past a point to the router folder

    //Index Route
    //New Route
    //Create Route
    //Show Route
    //Edit Route
    //Update Route
    //Destroy Route

//Landing Route
app.get("/", function(req, res){
    res.send("landing page is working");
});   
//This will be refactored to route.get if we put it in to differnt folder structures. 

//Console Listening
app.listen(process.env.PORT,process.env.IP,function(){
    console.log('App is running');
});