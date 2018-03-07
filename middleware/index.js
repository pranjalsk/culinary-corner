//all middleware

var Culinaryground      = require("../models/culinaryground");
var Comment         = require("../models/comment");

var middlewareObj   = {};

middlewareObj.checkCampgroundOwner = function (req,res,next){
     if (req.isAuthenticated()) {
        Culinaryground.findById(req.params.id, function(err,foundCampground){
           if (err) {
               req.flash("error","culinaryground not found");
               res.redirect("back");
           } 
           else{
               if (foundCampground.author.id.equals(req.user._id)) {
                   next();
               }else{
                    req.flash("error","permission denied");
                    res.redirect("back");
               }
           }
        });
    }else{
        req.flash("error","You need to log in");
        res.redirect("back");
    }
}

middlewareObj.checkCommentsOwner = function(req,res,next){
     if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err,foundComment){
           if (err) {
               res.redirect("back");
           } 
           else{
               if (foundComment.author.id.equals(req.user._id)) {
                   next();
               }else{
                   req.flash("error","permission denied");
                   res.redirect("back");
               }
           }
        });
    }else{
        req.flash("error","You need to log in");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req,res,next){
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error","Please log in first!");
    res.redirect("/login");
}

module.exports = middlewareObj;