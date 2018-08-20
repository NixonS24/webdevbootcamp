var express = require('express');
var app = express();
var bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','ejs');

var friends = ['Tony', 'Miranda', 'Justin', 'Pierre', 'Lily'];

app.get('/',function(request, response){
    response.render('home');
});

app.post('/addFriend', function(request, response){
    console.log(request.body)
    var newFriend =request.body.newfriend
    friends.push(newFriend)
    response.redirect('/friends');
    //response.send('You have reached the post route');
});


"/add new friend to list"
app.get('/friends', function(request, response){
 
    response.render('friends' , {friends: friends});
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server has started')
});