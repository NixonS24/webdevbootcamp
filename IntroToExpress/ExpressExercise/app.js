// Packages
var express = require('express')
var app = express();


// Routes
app.get("/", function(request,response){
    response.send("Hi there welcome to my assignment");
});

app.get("/speak/:animal", function(request, response){
      var animalNoises = {
        pig: "Oink",
        cow: "Moo",
        dog: "woof woof",
}
  
    var animal = request.params.animal;
    var animalNoise = animalNoises[animal].toLowerCase();
    
    response.send("The " + animal + " says " + animalNoise);
    


});

app.get("/repeat/:word/:number", function(request, response){
    var word = request.params.word;
    var number = parseInt(request.params.number);
    var messageToSend = "";
    
    for (var i = 0; i < number; i++) {
       messageToSend += (word + " ");
    }
    
     response.send(messageToSend);
});

app.get("*", function(request, response){
    response.send("Sorry, page not found ... What are you doing with your life?");
});


// Console Logging
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('server has started');
})




//Better to express this as an object because less code

// function makeAnimalNoise(animal) {
//      var animalNoise;
     
//      if (animal == 'pig'){
//         animalNoise = 'Oink';
//     } else if (animal == 'cow') {
//         amimalNoise = 'Moo';
//     } else if (animal == 'dog') {
//         amimalNoise = 'Woof Woof';
//     } else {
//         amimalNoise = "Screech Screech";
//         console.log("Default Noise");
//     }
//     return animalNoise;
// }