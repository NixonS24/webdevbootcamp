var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/associ_blog_demo");

//Post Schema 
//Title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);


//USER Schema
//email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema] //Note this is the name of the schema rather then just "Posts" Also we need to define this first.
});
var User = mongoose.model("User", userSchema);

//Data Format
// {
//     email: "sam.nixon@hotmail.com.au",
//     name: "Sam Nixon",
//     posts: [
//         {title:"University Times", content:"When I was a young boy..."},
//         {title:"First Job", content:"It all began on a Monday Morning..."},
//         {title:"Getting Married", content:"She was as a fine as a..."},
//         ]
// }

//Seed Users Database within embeeded framework
// var newUser = new User({
//     email: "hermonie@hotmail.com",
//     name: 'Hermonie Granger'
// });

// newUser.posts.push({
//     title: "How to brew polyjuice potion",
//     content: "Jut kidding... Got to potion class"
// });


// newUser.save(newUser, function(error, user){
//     if(error){
//         console.log(error)
//     } else {
//         console.log(user)
//     }
// });

//Seed Post Schema
// var newPost = new Post({  //Note how this aligns to variable 'postModel' rather then string 'Post' - althought it is quite common that these are the same
//     title: "Reflections on Apples",
//     content: "They are delicous"
// });

// newPost.save(newPost, function(error, post){
//     if(error){
//         console.log(error)
//     } else {
//         console.log(post)
//     }
// });

User.findOne({name: "Hermonie Granger"}, function(error, user){
    if (error){
        console.log(error);
    } else {
        console.log(user);
        user.posts.push({
            title: "3 things I really hate",
            content: "Voldemart, Ron, Harry"
        });
        user.save(function(error, user){
            if(error){
                console.log(error)
            } else {
                console.log(user)
            }
        });
    }
});
