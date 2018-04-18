/*jshint esversion: 6 */
var Order = require('../../Models/orderSchema');
var Seller = require('../../Models/sellerSchema');
var User = require('../../Models/userSchema');

//  /order/orderID/:OrderID
exports.getOrderByOrderID = (req, res) => {
    if(req.params.OrderID === undefined){
        res.json({success: false, error: "Missing OrderID in Request Body"});        
    }else{
        Order.findById(req.params.OrderID, function(err, order){
            if (err || !order){
                res.json({success: false, error: "could not find order"});
            }else{
                res.json({success: true, message: "Sucessfully Found that item", data: order}); 
            }
        });
    }
};

//  /order/sellerID/:SellerID
exports.getOrderBySellerID = (req, res) => {
    if(req.params.SellerID === undefined){
        res.json({success: false, error: "Missing OrderID in Request Body"});        
    }else{
        Order.find({seller_id: req.params.SellerID}, function(err, order){
            if (err || !order.length){
                res.json({success: false, error: "could not find order"});
            }else{
                res.json({success: true, message: "Sucessfully Found that item", data: order}); 
            }
        });
    }
};

// /order/userID/:UserID
exports.getOrderByUserID = (req, res) => {
    if(req.params.UserID === undefined){
        res.json({success: false, error: "Missing OrderID in Request Body"});        
    }else{
        Order.find({user_id: req.params.UserID}, function(err, order){
            if (err || !order.length){
                res.json({success: false, error: "could not find order"});
            }else{
                res.json({success: true, message: "Sucessfully Found that item", data: order}); 
            }
        });
    }
};

/**
 * req: 
 * {
 *    "api_token": "seller api token"
 * }
 * @param {*} req 
 * @param {*} res 
 */
exports.getOrderBySellerApiToken = (req, res) => {
    if(req.body.api_token === undefined){
        res.json({success: false, error: "Missing api_token in Request Body"});                
    }else{
        Seller.findOne( {api_token: req.body.api_token}, function(err, seller){
            if(err || !seller){
                res.json({success: false, error: "could not find seller"});                
            }else{
                Order.find({seller_id: seller._id}, function(err, order){
                    if (err || !order){
                        res.json({success: false, error: "could not find order"});
                    }else{
                        res.json({success: true, message: "Sucessfully Found that item", data: order}); 
                    }
                });
            }
        });
    }
};

/**
 * req: 
 * {
 *    "api_token": "user api token"
 * }
 * @param {*} req 
 * @param {*} res 
 */
exports.getOrderByUserApiToken = (req, res) => {
    if(req.body.api_token === undefined){
        res.json({success: false, error: "Missing api_token in Request Body"});                
    }else{
        User.findOne( {api_token: req.body.api_token}, function(err, user){
            if(err || !user){
                res.json({success: false, error: "could not find user"});                
            }else{
                Order.find({user_id: user._id}, function(err, order){
                    if (err || !order){
                        res.json({success: false, error: "could not find order"});
                    }else{
                        res.json({success: true, message: "Sucessfully Found that item", data: order}); 
                    }
                });
            }
        });
    }
};

