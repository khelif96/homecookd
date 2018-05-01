/*jshint esversion: 6 */

var Seller = require("../Models/sellerSchema");

// isOpen: Boolean,
    // schedule: {
    //     Monday: Date,
    //     Tuesday: Date,
    //     Wednesday: Date,
    //     Thursday: Date,
    //     Friday: Date,
    //     Saturday: Date,
    //     Sunday: Date
    // }
// from the seller api, find the id and store those there
exports.scheduleCreate = (req, res) => {
	if(req.body.seller_api_token === undefined || req.body.seller_api_token === ""){
		res.status(401).json({error:"Missing api_token"});
	} 
	Seller.findOne( {api_token: req.body.seller_api_token}, function (err, seller){
		if(err || !seller){
            res.status(401).json( {success: false,error: "Could not find seller"} );
		}else{
			console.log("Working");
			seller.schedule = req.body.schedule;
			seller.save(function (err) {
				if(err) {
            		res.status(500).send(err);
				} else {
                    res.json( {success: true, message: "Successfuly updated",data:{ schedule: seller.schedule, user_type: "Seller"}} );
				}
			});
		}	
	});
};