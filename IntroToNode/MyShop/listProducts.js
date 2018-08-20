var faker = require('faker');

console.log('Welcome to My Shop');
for (var i = 0; i < 10; i++) {
    var productName = faker.commerce.productName();
    var moneyAmount = faker.commerce.price();
    console.log(productName + ' - $' + moneyAmount);
}



