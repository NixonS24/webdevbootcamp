var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/associ_blog_demo_2");

var Post = require("./models/post");
var User = require("./models/user");



//Find User
//Find all posts for that user

// User.findOne({email:"bob@gmail.com.au"}).populate("posts").exec(function(error, user){
//     if(error){
//         console.log(error)
//     } else {
//         console.log(user)
//     }
// });
    

Post.create({
    title: "How to cook the best burger part 1",
    content: "123123123123123"
}, function (error, post){
    User.findOne({email:"bob@gmail.com.au"}, function(error, foundUser){
      if(error){
          console.log(error)
      } else {
          foundUser.posts.push(post);
          foundUser.save(function(error, data){
              if(error){
                  console.log(error)
              } else {
                  console.log(data)
              }
          });
      }
    });
});


// User.create({
//     email: "bob@gmail.com.au",
//     name: "Bob Belcher"
// });

