var express = require('express');
var app = express();

app.get("/",function(req,res){
    res.send("hi there");
});

app.get("/bye",function(req,res){
    res.send("you are the buy page-Goodbye");
});

app.get("/dog",function(req,res){
    res.send("you are on the dog page");
});

// Example of routing
app.get("/r/:subredditName", function(req,res){
    //console.log(req);
    var subreddit = req.params.subredditName;
    res.send("Welcome to a " + subreddit.toUpperCase() + "SUBREDDIT!");
});

app.get("/r/:subredditName/comments/:id/:title",function(req,res){
    res.send("welcome to the comments page");
});

app.get("*",function(req,res){
    res.send('This is the default route');
});





app.listen(process.env.PORT, process.env.IP, function(){
    console.log('server has started');
})

//console.log('Our express app will go here');