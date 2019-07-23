const express = require('express');
const productsRouter = require('./routes/products.ts');
const categoriesRouter = require('./routes/categories.ts');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);

app.get('/', (req, res) => {
    res.send("hello world!!!");
});



app.listen(3000, () => console.log("listeninig on port 3000"));