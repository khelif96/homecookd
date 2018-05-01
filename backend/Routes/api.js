/*jshint esversion: 6 */

// Dependencies
const express = require('express');
const router = express.Router();

// Controller Imports
const apiHome = require('../Controller/apiHome');
const auth = require('../Controller/auth');
const sellerModification = require('../Controller/sellerModification');
const getFoodItems = require('../Controller/food/getFoodItems');
const seller = require('../Controller/seller/profile');
const updateAccount = require('../Controller/updateAccount');
const searchBar = require('../Controller/searchBar');
const s3upload = require('../Controller/s3Upload');
const sellers = require('../Controller/sellers');
const createOrder = require('../Controller/Order/createOrder');
const updateOrder = require('../Controller/Order/updatesOrder');
const getOrder = require('../Controller/Order/getOrder');
const getSellerTime = require('../Controller/sellerTime');

// const foodTypeModification = require('../Controller/foodTypeModification/')

// API
// Base API Route
router.get('/', apiHome.getApi);
router.post('/', apiHome.postApi);

//Register User Route
router.get('/auth/login/user', auth.getLoginUser);
router.post('/auth/login/user', auth.loginUser);

//Register Seller Route
router.get('/auth/login/seller', auth.getLoginSeller);
router.post('/auth/login/seller', auth.loginSeller);

// Register Users(customer and seller) Route
router.post('/auth/register/user', auth.validateRegistration, auth.registerUser);
router.post('/auth/register/seller', auth.validateRegistration, auth.registerSeller);


// user information
router.post('/auth/information/user', auth.checkAuth, auth.userInfo);
// seller information
router.post('/auth/information/seller', auth.checkAuth, auth.sellerInfo);

// router.use(auth.checkAuth); // Routes that require and api_token after this

// try - delete later
router.post('/seller/foodItemCreate', sellerModification.foodItemCreate);


// Get Food information
router.get('/food/foodID/:FoodID', getFoodItems.getFoodItemByID); // Returns a Food object
router.get('/food/sellerID/:SellerID', getFoodItems.getFoodItemsBySellerID); // Returns an array of Food Objects
router.post('/food/api_token',getFoodItems.getFoodItemsByAPItoken);
router.post('/modification/foodItemCreate/seller', sellerModification.foodItemCreate);


//Order routes
router.post('/order/api_token', createOrder.orderFoodByApi);
router.post('/order/update', updateOrder.checkAuth, updateOrder.updateOrderStatus);
router.post('/order/update/prepping', updateOrder.checkAuth, updateOrder.updateOrderStatusOrderPrepping);
router.post('/order/update/received', updateOrder.checkAuth, updateOrder.updateOrderStatusOrderReceived);
router.post('/order/update/delivery', updateOrder.checkAuth, updateOrder.updateOrderStatusOutForDelivery);
router.post('/order/update/delivered', updateOrder.checkAuth, updateOrder.updateOrderStatusDelivered);
//get Orders
router.get('/order/orderID/:OrderID', getOrder.getOrderByOrderID);
router.get('/order/sellerID/:SellerID', getOrder.getOrderBySellerID);
router.get('/order/userID/:UserID', getOrder.getOrderByUserID);
router.post('/order/seller/api_token', getOrder.getOrderBySellerApiToken);
router.post('/order/user/api_token', getOrder.getOrderByUserApiToken);


// update seller
router.post('/update/account/seller', updateAccount.updateSellerAccount);
router.post('/update/account/seller/password', updateAccount.updateSellerAccountPassword);
router.post('/update/account/seller/email', updateAccount.updateEmail);
router.post('/update/account/seller/userName', updateAccount.updateUserName);



// get all the stores/restaurants
router.get('/seller/sellers', sellers.getAllSeller);

// Get Seller information
router.get('/seller/sellerID/:sellerID', seller.sellerInfoBySellerID);
router.get('/search/business/', searchBar.searchBar);
router.get('/search/business/:search', searchBar.searchBar);
router.post('/searchBar/business/seller', searchBar.searchBar);

//Get Seller opening and closing time 
router.post('/seller/sellerTime/schedule', getSellerTime.scheduleCreate);

// Update Seller
router.post('/seller/foodUpdate/:foodID', seller.updateFoodItem);

router.post('/sign_s3',s3upload.sign_s3);

// 404 paths
router.use(apiHome.invalidPath);

// Return Router
module.exports = router;
