// var request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

// var requestSecondExample = require('request');
// requestSecondExample('http://www.google.com', function (error, response, body) {
//     if (error){
//         console.log('Something went wrong');
//         console.log(error)
//     } else {
//         if(response.statusCode === 200) {
//             //Things Worked
//             console.log(body);
//         }
//     }
// });

var requestThirdExample = require('request');
requestThirdExample('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function (error, response, body) {
    if (!error && response.statusCode === 200){
        var parsedData =JSON.parse(body);
        console.log('Sunrise in Hawaii is at ... ');
        console.log(parsedData.query.results.channel.astronomy.sunrise);
       
    }
});