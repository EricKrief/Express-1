const categories = require('../categories.json');
const products = require('../products.json');
const uuid = require('uuid/v1');

for (let i = 0; i < categories.length; i++) {
    categories[i].id = uuid();
}

for (let i = 0; i < products.length; i++) {
    products[i].id = uuid();
}



module.exports.products = products;
module.exports.categories = categories;