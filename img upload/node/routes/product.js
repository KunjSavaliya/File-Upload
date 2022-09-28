const router = require("express").Router();
const productController = require('../controllers/productController');
const fechuser = require('../middleware/fechuser')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
        // cb(null, file.fieldname + '-' + Date.now())
        // cb(null, file.originalname + '_' + Date.now())
    }
})

// const fileFilter = (req, file, cd) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cd(null, true);
//     } else {
//         cd(null, false)
//     }
// };

const upload = multer({
    storage:storage,
    // fileFilter:fileFilter
});
// console.log("storage",storage)


router.post("/", upload.single("myFile"), productController.product_all);

router.post("/api", fechuser);

router.post("/login", productController.product_login);

router.get("/user", productController.product_details);

router.get("/adduase:id", productController.product_AddUaer);

router.put("/data/:id", upload.single("myFile"), productController.product_data);

router.delete("/user/:id", productController.product_delete);


module.exports = router;