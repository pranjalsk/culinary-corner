var express         = require("express");
var router          = express.Router();
var Culinaryground      = require("../models/culinaryground");
var middleware      = require("../middleware")

//INDEX ROUTE------------------------------------
router.get("/culinarygrounds", function(req,res){
    
   //Get all culinarygrounds from db
   Culinaryground.find({},function(err,allculinarygrounds){
       if (err) {
           console.log(err);
       }
       else{
           res.render("culinarygrounds/index",{culinarygrounds:allculinarygrounds, currentUser: req.user});
       }
   });
});

//CREATE ROUTE------------------------------------------
router.post("/culinarygrounds",middleware.isLoggedIn, function(req,res){
   
   var nameRec =req.body.name;
   var priceRec = req.body.price;
   var imageRec = req.body.image;
   var descRec= req.body.desc;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCulinaryground = {name:nameRec,price:priceRec,image:imageRec,desc:descRec, author:author};
    //cretae new culinaryground and save to db
    Culinaryground.create(newCulinaryground,function(err, newCreated){
        if (err) {
            console.log(err);
        }
        else{
            res.redirect("/culinarygrounds");
        }
    });
});

//NEW ROUTE----------------------------------------------
router.get("/culinarygrounds/new",middleware.isLoggedIn,function(req, res) {
    res.render("culinarygrounds/new.ejs");
});

//SHOW Route-more info----------------------------
router.get("/culinarygrounds/:id",function(req, res) {
    
    Culinaryground.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
        if (err) {
            console.log(err);
        }
        else{
            res.render("culinarygrounds/show",{culinaryground:foundCamp});
        }
    });
});


//EDIT CAMPGROUND ROUTE
router.get("/culinarygrounds/:id/edit",middleware.checkCampgroundOwner,function(req, res) {
        Culinaryground.findById(req.params.id, function(err,foundCampground){
           res.render("culinarygrounds/edit",{culinaryground:foundCampground});
        });
});


//UPDATE CAMPGROUND ROUTE
router.put("/culinarygrounds/:id",middleware.checkCampgroundOwner,function(req,res){
    //find and update coorect campgrnd
    Culinaryground.findByIdAndUpdate(req.params.id, req.body.culinaryground, function(err,updatedCampground){
       if (err) {
           console.log(err);
           res.redirect("/culinarygrounds");
       } 
       else{
           res.redirect("/culinarygrounds/"+ req.params.id);
       }
    });
});


//DESTROY CAMPGROUND ROUTE
router.delete("/culinarygrounds/:id",middleware.checkCampgroundOwner,function(req,res){
     Culinaryground.findByIdAndRemove(req.params.id,function(err){
         if (err) {
             res.redirect("/culinarygrounds");
         }else{
             res.redirect("/culinarygrounds");
         }
     });
});


module.exports = router;