const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    FullName: {type: 'String', required: true},
    MobileNo: {type: 'Number', required: true},
    Email: {type: 'String', required: true},
    Password: {type: 'String', required: true},
    Gender: {type: 'String', required: true},
    Hobby: {type: [], required: true},
    City: {type: 'String', required: true},
    profilePic:{type:"String",required:true},
    token: [{token: {type: 'String', required: true}}],
});

module.exports = mongoose.model("Product", productSchema);