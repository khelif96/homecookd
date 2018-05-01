/*jshint esversion: 6 */
var Seller = require("../../Models/sellerSchema");
var User = require("../../Models/userSchema");
var Order = require("../../Models/orderSchema");
var FoodItem = require("../../Models/foodItemSchema");

/**
 * {
        "user_api_token": "",
        "seller_api_token": "",
        "foodItems": [
            "ID",
            "ID",
            "ID"
        ]
    }
 * @param {*} req
 * @param {*} res
 */
exports.orderFoodByApi = (req, res) => {
    if(req.body.user_api_token === undefined){
        res.status(400).json( {success: false, error: "user api token is missing"} );
    }
    else if(req.body.seller_id === undefined){
        res.status(400).json( {success: false, error: "seller id is missing"} );
    }
    else if(req.body.foodItems === undefined){
        res.status(400).json( {success: false, error: "No food sellected"} );
    }
    else{
        // check if user exists
        User.findOne({api_token: req.body.user_api_token}, function(err, user){
            if(err || !user){
                Seller.findOne({api_token: req.body.user_api_token}, function(err, seller){
                  if(err || !seller) {
                    res.status(400).json( {success: false, error: "Could not find user"} );
                  }
                  res.status(400).json({success: false, error: 'You are logged in as a seller. Please log in as a user.'});
                });
            }else{
                Seller.findOne({_id: req.body.seller_id}, function(err, seller){
                    if(err || !seller){
                        res.status(400).json( {success: false, error: "Could not find seller"} );
                    }else{
                        FoodItem.find( {'_id': {$in: req.body.foodItems} }, function(err, foodItems){
                            if(err || !foodItems.length){
                                res.status(400).json( {success: false, error: "Could not find any foodItem"} );
                            }else{
                                var tempOrder = new Order();
                                tempOrder.user_id = user._id;
                                tempOrder.seller_id = seller._id;
                                tempOrder.foodItems = req.body.foodItems;
                                tempOrder.delivery_location = req.body.delivery_location;
                                // order status will be changed by seller
                                tempOrder.orderStatus.orderReceived = true;
                                tempOrder.orderStatus.orderPrepping = false;
                                tempOrder.orderStatus.outForDelivery = false;
                                tempOrder.orderStatus.delivered = false;
                                tempOrder.save(function(err){
                                    if(err){
                                        res.status(500).send(err);
                                    }else{
                                        updateSellerAndUserOrders(user._id, seller._id, tempOrder, res);
                                    }
                                });

                            }
                        });
                    }
                });
            }
        });
    }
};

function updateSellerAndUserOrders(user_id, seller_id, tempOrder, res){
    User.update({ _id: user_id }, { $push: { orders: tempOrder._id } },
        function (err, numAffected, rawResponse) {
            if (err) {
                res.status(400).json("contact addMsg error: " + err);
            }else{
                Seller.update({ _id: seller_id }, { $push: { orders: tempOrder._id } },
                    function (err, numAffected, rawResponse) {
                        if (err) {
                            res.status(400).json("contact addMsg error: " + err);
                        }else{
                            res.json({success: true, message: "Sucessfully placed order", data: tempOrder});
                        }
                    }
                );
            }
        }
    );
}
