var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/cat_app');

//This defines a pattern for out data;
//It is not strict, but more for ease of use
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

//Takes pattern that creates complex model with methods
var Cat = mongoose.model("Cat",catSchema);
//The first arguement "Cat" needs to singular verion of the model
//It will takes this and create a collection called "Cats"

// var George = new Cat({
//     name: 'George',
//     age: 11,
//     temperament: 'grouchy'
// });

//We have added this in callback function to track and error 
//In case it does not work

// George.save(function(error, cat){
//     if (error) {
//         console.log('Something went wrong!')
//     } else {
//         console.log('We just save a cat to the DB')
//         console.log(cat);
//     }
// });
//Lets us add a new cat to the database. 
//Retrieve all cats from the database and console.log each one. 

//finds all the data and handles errors.
// Cat.find({},function(error,cats){
//     if(error) {
//         console.log('Something went wrong!')
//     } else {
//         console.log("all the cats")
//         console.log(cats);
//     }
// });

Cat.create({
    name: 'Snow White',
    age: 15,
    temperament: 'Bland'
}, function(error, cat){
    if (error) {
        console.log("error occured " + error)
    } else {
        console.log("a cat was created " + cat)
    }
});