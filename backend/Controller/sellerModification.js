/*jshint esversion: 6 */
var FoodItem = require("../Models/foodItemSchema");
var Seller = require("../Models/sellerSchema");

// aws s3 sdk

// from the seller api, find the id and store those there
exports.foodItemCreate = (req, res) => {
    if(req.body.seller_api_token === undefined || req.body.seller_api_token === "" ){
        res.status(400).json( {error: "Missing api_token in request"} );
        return;
    }
    Seller.find( {api_token: req.body.seller_api_token}, function(err, docs){
        if (!docs.length || err){
            res.status(401).json( {error: "Could not find seller with this api token"} );
        }else{
            var tempFoodItem = new FoodItem();
            tempFoodItem.name = req.body.name;
            // take care of images later / store it in amazon get link and store it here
            // middle man to get wherae to send
            tempFoodItem.ingredients = req.body.ingredients;
            tempFoodItem.allergens = req.body.allergens;
            tempFoodItem.seller_id = docs[0]._id;
            tempFoodItem.description = req.body.description;
            tempFoodItem.price = req.body.price;
            tempFoodItem.foodType = req.body.foodType;
            var tempFoodItem_id = tempFoodItem.id;
            tempFoodItem.save(function (err) {
                if (err) {
                    console.log("Error while saving to database ");
                    res.status(500).send(err);
                } else {
                    sellerUpdateFoodItemId(tempFoodItem.seller_id, tempFoodItem_id,res);
                }
            });
        }
    });
};

function sellerUpdateFoodItemId(seller_id, tempFoodItem_id , res, req)
{
    Seller.update({ _id: seller_id }, { $push: { food_items_id: tempFoodItem_id } },
        function (err, numAffected, rawResponse) {
            if (err) {
                res.status(400).json("contact addMsg error: " + err);
            }else{
                res.status(201);
                res.json({ message: "Sucesfully registered", _id: tempFoodItem_id });
            }
            //console.log('The number of updated documents was %d', numAffected);
            //console.log('The raw response from Mongo was ', rawResponse);
        }
    );
}
