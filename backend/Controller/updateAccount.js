/*jshint esversion: 6 */
var User = require("../Models/userSchema");
var Seller = require("../Models/sellerSchema");
var bcrypt = require("bcryptjs");
var hat = require("hat");
const saltRounds = 10;
var rack = hat.rack(64, 16);
var emailRegex = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$");
var userNameRegex = new RegExp("^[a-zA-Z0-9\.\-\_]{3,15}$");
var passwordRegex = new RegExp("^(?=.{4,})");


// no userName and email address
exports.updateSellerAccount = (req, res) => {
  if(req.body.api_token === undefined || req.body.api_token === "" ){ //add if password is not filled
    res.status(401).json( {success:false, error: "Missing api_token in request"} );
  }
  else{
    Seller.findOne( {api_token: req.body.api_token}, function(err, seller){
      if (!seller  || err){
        res.status(401).json( {success:false, error: "Could not find seller with this api token"} );
      }else{
        var isReqEmpty = true;
        var isEmailGood;
        if(req.body.name !== undefined){
          isReqEmpty = false;
          seller.name = req.body.name;
        }
        if(req.body.business_name !== undefined){
          isReqEmpty = false;
          seller.business_name = req.body.business_name;
        }
        if(req.body.location !== undefined){
          isReqEmpty = false;
          seller.location = req.body.location;
        }
        if(req.body.newPassword !== undefined){
          if(req.body.oldPassword === req.body.newPassword){
            res.status(401).json( {success:false, error: "New password is the same as old one"} );
          }else if(!passwordRegex.test(req.body.newPassword)){
            res.status(401).json( {success:false, error: "invalid password, has to contain at least one lower, one upper case character and has to be at least 6 digits"} );
          }else{
            console.log("Comparing passwords");
            bcrypt.compare(req.body.oldPassword, seller.password_hash, function(err, valid){
              if (valid){
                console.log("valid", valid );
                bcrypt.hash(req.body.newPassword, saltRounds, function(err, hash){
                  seller.password_hash = hash;
                  isReqEmpty = false;
                  seller.save(function(err){
                    if (err){
                      console.log("Error while saving to database ");
                      res.status(500).json( {success: false, error: "Error while saving"} );
                    }else{
                      //console.log(seller);
                      res.status(200);
                      res.json( {success: true, message: "Sucesfully changed password"} );
                    }
                  });
                });
              }else{
                res.status(401).json( {success:false, error: "Invalid password"} );
              }
            });
          }
        }else{
          if (!isReqEmpty){
            seller.save(function(err){
              if (err){
                console.log("Error while saving to database ");
                res.status(500).json( {success: false, error: "Error while saving"} );
              }else{
                //console.log(seller);
                res.status(200);
                res.json( {success: true, message: "Sucesfully changed password"} );
              }
            });
          }else{
            res.status(500).json( {success: false, error: "Nothing in request"} );
          }
        }
      }
    });
  }
};

exports.updateSellerAccountPassword = (req, res) => {
  if(req.body.api_token === undefined || req.body.api_token === "" ){ //add if password is not filled
      res.status(401).json( {success:false, error: "Missing api_token in request"} );
  }
  Seller.findOne( {api_token: req.body.api_token}, function(err, seller){
    if (!seller  || err){
      res.status(401).json( {success:false, error: "Could not find seller with this api token"} );
    }else {
      if(req.body.oldPassword === req.body.newPassword){
        res.status(401).json( {success:false, error: "New password is the same as old one"} );
      }else if(!passwordRegex.test(req.body.newPassword)){
        res.status(401).json( {success:false, error: "invalid password, has to contain at least one lower, one upper case character and has to be at least 6 digits"} );
      }else{
        console.log("Comparing passwords");
        bcrypt.compare(req.body.oldPassword, seller.password_hash, function(err, valid){
          if (valid){
            updateSellerPassword(seller._id, req.body.newPassword, res);
          }else{
            res.status(401).json( {success:false, error: "Invalid password"} );
          }
        });
      }
    }
  }); // Seller.find
}; // export

function updateSellerPassword(seller_id, newPassword, res)
{
  Seller.findOne({ _id: seller_id },
    function (err, seller) {
      if (err) {
        res.status(500).json( {success:false, error: "contact addMsg error: " + err} );
      }else{
        console.log(seller);
        bcrypt.hash(newPassword, saltRounds, function(err, hash){
          seller.password_hash = hash;
          seller.save(function(err){
            if (err){
              console.log("Error while saving to database ");
              res.status(500).send(err);
            }
            console.log(seller);
            res.json( {success: true, message: "Sucesfully changed password",data:{api_token: seller.api_token, user_type: "Seller"}} );
          });
        });
      } //else close
    }
  );
}
// do not need api_token
exports.updateEmail = (req, res) => {
  // if(req.body.api_token === undefined || req.body.api_token === "" ){ //add if password is not filled
  //   res.status(401).json( {success:false, error: "Missing api_token in request"} );
  // }else 
  if(req.body.newEmail === undefined || req.body.oldEmail === undefined){
    res.status(401).json( {success:false, error: "Missing email in request"} );        
  }else if(req.body.newEmail === req.body.oldEmail) {
    res.status(401).json( {success:false, error: "Both emails are the same"} );            
  }else if (!emailRegex.test(req.body.newEmail)) {
    res.status(400);
    res.json( {error: "invalid Email address"} );
  }else{
    Seller.find( {email: req.body.newEmail}, function(err, sellers){
      if(err){
        res.status(500).send(err);        
      }else if(!sellers.length){
        Seller.findOne( {email: req.body.oldEmail}, function(err, seller){
          if(!seller || err){
            res.status(401).json( {success:false, error: "Could not find seller"} );                                
          }else{
            seller.email = req.body.newEmail;
            seller.save(function(err){
              if(err){
                res.status(500).send(err);  
              }else{
                res.json( {success: true, message: "Sucesfully changed email",data:{seller_info: seller, user_type: "Seller"}} );                
              }
            });
          }
        });
      }else{
        res.status(401).json( {success:false, error: "Email already exists"} );                    
      }
    });
  }
};

exports.updateUserName = (req, res) => {
  if(req.body.newUserName === undefined || req.body.oldUserName === undefined){
    res.status(401).json( {success:false, error: "Missing user name in request"} );        
  }else if(req.body.newUserName === req.body.oldUserName) {
    res.status(401).json( {success:false, error: "Both user names are the same"} );            
  }else if (!userNameRegex.test(req.body.newUserName)) {
    res.status(400);
    res.json( {error: "invalid user name"} );
  }else{
    Seller.find( {userName: req.body.newUserName}, function(err, sellers){
      if(err){
        res.status(500).send(err);        
      }else if(!sellers.length){
        Seller.findOne( {userName: req.body.oldUserName}, function(err, seller){
          if(!seller || err){
            res.status(401).json( {success:false, error: "Could not find seller"} );                                
          }else{
            seller.userName = req.body.newUserName;
            seller.save(function(err){
              if(err){
                res.status(500).send(err);  
              }else{
                res.json( {success: true, message: "Sucesfully changed user name",data:{seller_info: seller, user_type: "Seller"}} );                
              }
            });
          }
        });
      }else{
        res.status(401).json( {success:false, error: "User name already exists"} );                    
      }
    });
  }
};