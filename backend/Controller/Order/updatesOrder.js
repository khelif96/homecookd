/*jshint esversion: 6 */
var Seller = require("../../Models/sellerSchema");
var FoodItem = require("../../Models/foodItemSchema");
var Order = require("../../Models/orderSchema");


exports.checkAuth = (req, res, next) => {
    if (req.body.api_token === undefined) {
        res.status(400).json( {success: false, error: "Missing api_token in request"} );
    }else if(req.body.orderID === undefined){
        res.status(400).json( {success: false, error: "Missing order id in request"} );
    }else{
        next();
    }
};

/**
 * The below is an example of how to use this function.
 * {
	"api_token": "seller api token",
	"orderID": ".....",
	"orderStatus": {
		"orderReceived": boolean,
		"orderPrepping": boolean,
		"outForDelivery": boolean,
		"delivered": boolean
	}
}
 * @param {*} req
 * @param {*} res
 */
exports.updateOrderStatus = (req, res) => {
    Seller.findOne( {api_token: req.body.api_token},
        function(err, seller){
            if(err || !seller){
                res.status(400).json( {success: false, error: "Could not find seller"} );
            }else{
                Order.findById( req.body.orderID, function(err, order){
                    if(err || !order){
                        res.status(400).json( {success: false, error: "Could not find order"} );
                    }else{
                        order.orderStatus= req.body.orderStatus;
                        order.save(function(err){
                            if(err){
                                res.status(500).send(err);
                            }else{
                                res.status(200).json( {success: true, data: {message: "Successfully, order is updated", order_info: order}} );
                            }
                        });
                    }
                });
            }
        }
     );
};


/**
 * The below is an example of how to use this function.
 * {
	"api_token": "seller api token",
	"orderID": ".....",
	"orderStatus": {
		"orderReceived": boolean
	}
}
 * @param {*} req
 * @param {*} res
 */
exports.updateOrderStatusOrderReceived = (req, res) => {
    Seller.findOne( {api_token: req.body.api_token},
        function(err, seller){
            if(err || !seller){
                res.status(400).json( {success: false, error: "Could not find seller"} );
            }else{
                console.log(seller.orders);
                Order.findById( req.body.orderID, function(err, order){
                    if(err || !order){
                        res.status(400).json( {success: false, error: "Could not find order"} );
                    }else{
                        order.orderStatus.orderReceived= req.body.orderStatus.orderReceived;
                        order.save(function(err){
                            if(err){
                                res.status(500).send(err);
                            }else{
                                res.status(200).json( {success: true, data: {message: "Successfully, order is updated", order_info: order}} );
                            }
                        });
                    }
                });
            }
        }
    );
};

/**
 * The below is an example of how to use this function.
 * {
	"api_token": "seller api token",
	"orderID": ".....",
	"orderStatus": {
		"orderPrepping": boolean
	}
}
 * @param {*} req
 * @param {*} res
 */
exports.updateOrderStatusOrderPrepping = (req, res) => {
    Seller.findOne( {api_token: req.body.api_token},
        function(err, seller){
            if(err || !seller){
                res.status(400).json( {success: false, error: "Could not find seller"} );
            }else{
                Order.findById( req.body.orderID, function(err, order){
                    if(err || !order){
                        res.status(400).json( {success: false, error: "Could not find order"} );
                    }else{
                        order.orderStatus.orderPrepping= req.body.orderStatus.orderPrepping;
                        order.save(function(err){
                            if(err){
                                res.status(500).send(err);
                            }else{
                                res.status(200).json( {success: true, data: {message: "Successfully, order is updated", order_info: order}} );
                            }
                        });
                    }
                });
            }
        }
    );
};

/**
 * The below is an example of how to use this function.
 * {
	"api_token": "seller api token",
	"orderID": ".....",
	"orderStatus": {
		"outForDelivery": boolean
	}
}
 * @param {*} req
 * @param {*} res
 */
exports.updateOrderStatusOutForDelivery = (req, res) => {
    Seller.findOne( {api_token: req.body.api_token},
        function(err, seller){
            if(err || !seller){
                res.status(400).json( {success: false, error: "Could not find seller"} );
            }else{
                Order.findById( req.body.orderID, function(err, order){
                    if(err || !order){
                        res.status(400).json( {success: false, error: "Could not find order"} );
                    }else{
                        order.orderStatus.outForDelivery= req.body.orderStatus.outForDelivery;
                        order.save(function(err){
                            if(err){
                                res.status(500).send(err);
                            }else{
                                res.status(200).json( {success: true, data: {message: "Successfully, order is updated", order_info: order}} );
                            }
                        });
                    }
                });
            }
        }
    );
};

/**
 * The below is an example of how to use this function.
 * {
	"api_token": "seller api token",
	"orderID": ".....",
	"orderStatus": {
		"delivered": boolean
	}
}
 * @param {*} req
 * @param {*} res
 */
exports.updateOrderStatusDelivered = (req, res) => {
    Seller.findOne( {api_token: req.body.api_token},
        function(err, seller){
            if(err || !seller){
                res.status(400).json( {success: false, error: "Could not find seller"} );
            }else{
                Order.findById( req.body.orderID, function(err, order){
                    if(err || !order){
                        res.status(400).json( {success: false, error: "Could not find order"} );
                    }else{
                        order.orderStatus.delivered= req.body.orderStatus.delivered;
                        order.save(function(err){
                            if(err){
                                res.status(500).send(err);
                            }else{
                                res.status(200).json( {success: true, data: {message: "Successfully, order is updated", order_info: order}} );
                            }
                        });
                    }
                });
            }
        }
    );
};
