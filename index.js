const express = require('express');
const app = express();
const cors = require('cors')
const Product = require('./mongoose');  // Import the mongoose model
app.use(express.json())
app.use(cors())
app.get('/',(req,res)=> {
    res.send('shri ganesh')
})
app.get('/getproducts', async (req, res) => {
    try {
        const products = await Product.find();  // Use the mongoose model to find products
        console.log(products);
        res.json(products);  // Send the found products as a response
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }// Empty dependency array to run the effect only once
    
});
app.post('/post', (req, res) => {
    console.log(req.body);

    // Filter out fields with empty values
    const filteredBody = {};
    for (const key in req.body) {
        if (req.body[key]) {
            filteredBody[key] = req.body[key];
        }
    }

    // Create a new Product instance with non-empty fields
    const product = new Product(filteredBody);

    product.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send('Error saving product');
        });
});
app.post('/product/:id',async (req,res)=> {
    // console.log(req.params.id)
    try {
        const products = await Product.find({_id:req.params.id});  // Use the mongoose model to find products
        console.log(products);
        res.json(products);  // Send the found products as a response
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }//

})


app.listen(2100, () => {
    console.log('Server is running on port: 2100');
});
