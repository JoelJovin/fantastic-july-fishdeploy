const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");
const multer = require('multer');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

router.post('/addProduct', upload.single('image_url'), userController.addProduct);

router.post("/signup", userController.signup);
//router.post("/addProduct", userController.addProduct);
router.post("/addAddress", userController.addAddress);
router.post("/login", userController.login);
router.get("/getproductid",userController.getproductid)
router.get("/user",userController.users)
router.get("/product",userController.getproduct )
router.get('/users', userController.getUserByEmail);
router.get('/address', userController.getaddressbyid);
router.post('/logout', userController.logout);
router.post('/clear', userController.deletebyemail);
router.post('/reviews', userController.reviews);
router.post('/getreviews', userController.getreviews);
router.post('/order', userController.orders);
router.get('/getorders', userController.getordersbyid);
router.delete('/deleteorder', userController.deleteorderbyid);


module.exports = router;