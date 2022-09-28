const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/public',express.static('public'));
const productRoutes = require("./routes/product");
app.use('/api/products', productRoutes);



mongoose.connect(
    process.env.DB_CONNECT,
    {useUnifiedTopology: true, useNewUrlParser: true},
    () => console.log("connected to db")
);


app.listen(3000, () => console.log("Hello world app listening on port  !"));

