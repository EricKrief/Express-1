const express = require('express');
const router = express.Router();
const data = require('./data-aggregation.ts');
const uuid = require('uuid/v1');


const products = data.products;

router.get('/', (req, res) => {
    res.send(products);
})


router.post('/', (req, res) => {
    const product = {
        category: req.body.category,
        name: req.body.name,
        itemsInStock: req.body.itemsInStock,
        id: uuid(),
    };
    if (product.name.length < 3) {
        res.status(409).send("Name must be at least 3 characters long");
        return;
    }
    products.push(product);
    res.status(201).send(product);
})



router.get('/:id', (req, res) => {

    const product = products.find(p => p.id === req.params.id);
    if (req.params.id.length !== 36) {
        res.status(400).send("ID must be 36 characters long");
        return;
    }
    if (!product) {
        res.status(404).send("Product not found");
        return;
    }
    res.send(product);
});


router.put("/:id", (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (req.params.id.length !== 36) {
        res.status(400).send("ID must be 36 characters long");
        return;
    }
    if (!product) {
        res.status(404).send("Product not found");
        return;
    }
    if (req.body.name && req.body.name.length < 3) {
        res.status(409).send("Name must be at least 3 characters long");
        return;
    }
    if (req.body.category) {                  //checking which fields are requested to be upadated
        product.category = req.body.category;
    }
    if (req.body.itemsInStock) {
        product.itemsInStock = req.body.itemsInStock;
    }
    if (req.body.name) {
        product.name = req.body.name;
    }
    res.status(202).send(product);
});

router.delete("/:id", (req, res) => {
    let index = -1;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === req.params.id) {
            index = i;
        }
    }
    if (req.params.id.length !== 36) {
        res.status(400).send("ID must be 36 characters long");
        return;
    }
    if (index === -1) {
        res.status(404).send("Product not found");
        return;
    }
    products.splice(index, 1);
    res.sendStatus(204);
});

module.exports = router;