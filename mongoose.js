const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Meesho", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('localdb connected'))
    .catch((err) => console.log(err));

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    detail: String,
    image1: String,
    image2: String,
    image3: String,
    image4: String,
    category: String
});

module.exports = mongoose.model('Product', productSchema);
