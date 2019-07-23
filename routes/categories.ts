const express = require('express');
const router = express.Router();
const data = require('./data-aggregation.ts');
const uuid = require('uuid/v1');


const categories = data.categories;
const products = data.products;

router.get("/", (req, res) => {
    res.send(categories);
});

router.get("/:id", (req, res) => {
    const category = categories.find(c => c.id === req.params.id);
    if (req.params.id.length !== 36) {
        res.status(400).send("ID must be 36 characters long");
        return;
    }
    if (!category) {
        res.status(404).send("Categorie not found");
        return;
    }

    res.send(category);
});

router.get("/:id/products", (req, res) => {
    const category = categories.find(c => c.id === req.params.id);
    if (req.params.id.length !== 36) {
        res.status(400).send("ID must be 36 characters long");
        return;
    }
    if (!category) {
        res.status(404).send("Categorie not found");
        return;
    }
    const categoryProducts = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].category === category.name) {
            categoryProducts.push(products[i]);
        }
    }
    res.send(categoryProducts);
});

router.post("/", (req, res) => {

    const category = {
        name: req.body.name,
        id: uuid(),
    };
    categories.push(category);
    res.status(201).send(category);
});

router.put("/:id", (req, res) => {
    const category = categories.find(c => c.id === req.params.id);
    if (req.params.id.length !== 36) {
        res.status(400).send("ID must be 36 characters long");
        return;
    }
    if (!category) {
        res.status(404).send("Categorie not found");
        return;
    }
    category.name = req.body.name;
    res.status(202).send(category);
});

router.delete("/:id", (req, res) => {
    let index = -1;
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].id === req.params.id) {
            index = i;
        }
    }
    if (req.params.id.length !== 36) {
        res.status(400).send("ID must be 36 characters long");
        return;
    }
    if (index === -1) {
        res.status(404).send("Category not found");
        return;
    }
    categories.splice(index, 1);
    res.sendStatus(204);
});

module.exports = router;