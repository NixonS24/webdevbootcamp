var express = require('express');
var app = express();

app.use(express.static("public"))
app.set('view engine', 'ejs');

//route
app.get('/', function(requet, response){
    response.render('home');
    //response.send('<h1>welcome to the home page</h1>');
});

app.get('/fallinlovewith/:thing', function(request, response){
    var thing = request.params.thing;
    //response.send('you fell in love with ' + thing);
    response.render('love.ejs', {thingVar: thing});
});

app.get("/posts", function (request, response){
    var posts = [
        {title: 'Post 1', author: 'Sam'},
        {title: 'My adorable pet bunny', author: 'Dan'},
        {title: 'Can you beleive this pomsky!', author: 'Graham'},
    ];
    
    response.render('posts.ejs', {posts: posts})
});

//Console Listening
app.listen(process.env.PORT,process.env.IP,function(){
    console.log('server is listening')
});