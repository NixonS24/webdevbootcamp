//Schema Setup & Model Creation
var mongoose = require('mongoose');

var newSchema = new mongoose.Schema({
    //Insert Schema setup here - typical usage
    name: String,
    age: Number,
    created: {type: Date, default: Date.now} //this creates default date if not data is entered
    
});
var Model = mongoose.model('Model', newSchema) //This will create a collection in our database, called the plural of our string (ie "Models")
//We can now access the model using the term Model ( convention is that it you should call it the same as the first arguement string - ie. 'Model')
module.exports = Model;