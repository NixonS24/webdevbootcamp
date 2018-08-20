var express = require('express')
var app = express();
var request = require('request');

app.set("view engine", "ejs");



app.get("/search", function(req, res){
    res.render('search');
});

app.get("/results", function(req, res){
        //console.log(req.query); //logs information that is set
        var search = req.query.search;
        var url = 'http://www.omdbapi.com/?s=' + search + '&apikey=thewdb';
        
        request(url, function (error, response, body) {
        if (!error && response.statusCode === 200){
            var parsedData =JSON.parse(body);
            //res.send(parsedData.Search[0].Title);
            res.render("results",{data: parsedData});
        }
    });
});




//Console Listening
app.listen(process.env.PORT,process.env.IP,function(){
    console.log('Movie app has started listening')
});