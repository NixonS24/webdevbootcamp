var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose'),
    expressSanitizer= require("express-sanitizer")
    

mongoose.connect("mongodb://localhost/restful_blog_app");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(expressSanitizer()); //Has to go after body parser
    
//Mongoose Model Schema
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog",blogSchema);

//RESTful Route
app.get("/", function(req,res){
    res.redirect("/blogs")
});

// Index Routes
app.get("/blogs", function(req,res){
    Blog.find({},function(error,blogs){
        if (error){
            console.log('ERROR')
        } else {
            res.render("index", {blogs:blogs});
        }
    });
});

//New Routes
app.get("/blogs/new",function(req,res){
    res.render("new");
});

//Create Routes
app.post("/blogs", function(req, res){
    //console.log(newBlogPost);
    //req.body - allows us to capture the request data that is coming using the middlware body-parser
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(error, newBlogPost){
        if (error){
            res.render("new")
        } else {
            res.redirect("/blogs");
        }
    });
});

//Show Route
app.get("/blogs/:id", function(req,res){
    //console.log(req.params.id);
    Blog.findById(req.params.id, function(error, foundBlog){
        if(error){
            console.log(error);
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog})
        }
    });
});

//Edit Route
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(error, foundBlog){
        if(error){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog})
        }
    });
});
//Update Route
app.put("/blogs/:id", function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(error, updatedBlog){
        if (error) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//Delete Route
app.delete("/blogs/:id", function(req,res){
    //destroy blog
    Blog.findByIdAndRemove(req.params.id, function(error){
        if(error){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

//Console Listening
app.listen(process.env.PORT,process.env.IP,function(){
    console.log('RESTful Blog is running');
});