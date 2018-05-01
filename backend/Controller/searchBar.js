/*jshint esversion: 6 */

var Seller = require("../Models/sellerSchema");
var foodType = require("../Models/foodTypeSchema");


exports.searchBar = (req,res) => {
  if(req.params.search === undefined){
      Seller.find({},'-password_hash -account_approved -email -createDate -account_approved', function(err,docs){
          if(!docs || err){
            res.status(400).json( {success: false, message: "No seller found"} );
          }else{
            res.status(200).json( {success: true, message: "Successfuly Found Sellers",data:{sellers: docs}});
          }
      });
  }
  else {
  Seller.find( {$or: [{business_name:{$regex:new RegExp(req.params.search, "i")}},
  {business_type: {$regex : new RegExp(req.params.search)}}]},
  '-password_hash -email -api_token -email -createDate -account_approved',
  function (err, seller){
    if (!seller || err){
      res.status(401).json( {error: "Could not find any business or food type with this name"});
    }else{
      res.status(200).json( {success:true, data:seller} );
    }
  });
  }
};
