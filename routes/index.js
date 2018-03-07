var express         = require("express");
var router          = express.Router();
var passport        = require("passport");
var User            = require("../models/user");


//LANDING PAGE--------------------------
router.get("/",function(req,res){
    res.render("landing");
});



//===============================================
//AUTHENTICATION ROUTES
//===============================================
// SHOW REGISTER FORM
router.get("/register",function(req, res) {
    res.render("register");
});

router.post("/register",function(req, res){
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password, function(err,user){
        if (err) {
            req.flash("error", err.message);
            return res.render("/register");
        }else{
            passport.authenticate("local")(req,res,function(){
                req.flash("success","Welcome to Culinary Corner" + user.username);
                res.redirect("/culinarygrounds");
            });
        }
    });
});

//SHOW LOGIN FORM
router.get("/login",function(req, res) {
    res.render("login");
});

//Handing Login
router.post("/login",passport.authenticate("local",
    {   successRedirect:"/culinarygrounds",
        failureRedirect:"/login"
    }),function(req, res) {});

//LOGOUT
router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success","Logged you out");
    res.redirect("/culinarygrounds");
});


module.exports = router;