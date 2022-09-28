const Product = require("../model/Product");
var jwt = require('jsonwebtoken');

const product_all = async (req, res) => {
    const sing = new Product({
        FullName: req.body.FullName,
        MobileNo: req.body.MobileNo,
        Email: req.body.Email,
        Password: req.body.Password,
        Gender: req.body.Gender,
        Hobby: req.body.Hobby,
        City: req.body.City,
        profilePic:req.file.filename
    });
    sing.save()
        .then(data => {
            res.json(data)
        }).catch(error => {
        res.json(error)
    })
};

const product_details = async (req, res) => {
    try {
        const findAll = await Product.find();
        res.json(findAll);
    } catch (err) {
        res.json(error)
    }
};

const product_AddUaer = async (req, res) => {
    const post = await Product.findById({
        _id: req.params.id,
    })
    res.send(post)
};


const product_data = async (req, res) => {
    let data={
        FullName: req.body.FullName,
        MobileNo: req.body.MobileNo,
        Email: req.body.Email,
        Password: req.body.Password,
        Gender: req.body.Gender,
        Hobby: req.body.Hobby,
        City: req.body.City,
        profilePic:req.file.filename
    };
    try {
        const post = await Product.findByIdAndUpdate({_id:req.params.id}, {$set: data}, {new: true,useFindAndModify:false});
        res.send(post)
    }catch (e) {
        res.json({message:e})
    }
};

const product_delete = async (req, res) => {
    const data = await Product.deleteOne({
        _id: req.params.id,
    });
    res.send(data);
};

const product_login = async (req, res) => {
    const {email, password} = req.body
    Product.findOne({Email: email}, (err, user) => {
        if (user) {
            if (password === user.Password) {
                const token = jwt.sign({_id: user._id}, 'todo-app-super-shared-secret', {expiresIn: '20s'});
                res.json({token: token})
            } else {
                res.send({message: "not match"})
            }
        } else {
            res.send({message: "not register"})
        }
    })
};


module.exports = {
    product_all,
    product_AddUaer,
    product_details,
    product_data,
    product_delete,
    product_login
}