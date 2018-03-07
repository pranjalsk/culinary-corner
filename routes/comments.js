var express         = require("express");
var router          = express.Router();
var Culinaryground      = require("../models/culinaryground");
var Comment         = require("../models/comment");
var middleware      = require("../middleware")

//-------------------------------------------------------
//COMMENT ROUTES
//------------------------------------------------
//COMMENTS NEW
router.get("/culinarygrounds/:id/comments/new",middleware.isLoggedIn,function(req, res) {
    Culinaryground.findById(req.params.id,function(err,culinaryground){
        if (err) {
            console.log(err);
        }
        else{
            res.render("comments/new",{culinaryground:culinaryground});
        }
    });
});

//COMMENTS CREATE
router.post("/culinarygrounds/:id/comments",middleware.isLoggedIn,function(req, res){
    //lookup campgnd using id
    Culinaryground.findById(req.params.id,function(err,culinaryground){
        if (err) {
            console.log(err);
            res.redirect("/culinarygrounds");
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if (err) {
                    console.log(err);
                }
                else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    
                    culinaryground.comments.push(comment);
                    culinaryground.save();
                    req.flash("success","Successfully added comment");
                    res.redirect("/culinarygrounds/"+culinaryground._id);
                }
            });
        }
    });
    //create nw comment
    //connect new comment to campgnd
    //redirect to campgnd show page
});

//COMMENTS EDIT ROUTE
router.get("/culinarygrounds/:id/comments/:comment_id/edit",middleware.checkCommentsOwner,function(req,res){
    Comment.findById(req.params.comment_id,function(err, foundComments) {
        if (err) {
            res.redirect("back");
        }
        else{
            req.flash("success","Successfully edited comment");
            res.render("comments/edit",{culinaryground_id:req.params.id, comment:foundComments});
        }
    })
});

//COMMENTS UPDATE ROUTE
router.put("/culinarygrounds/:id/comments/:comment_id",middleware.checkCommentsOwner,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err){
        if (err) {
            res.redirect("back");
        }
        else{
            res.redirect("/culinarygrounds/"+req.params.id);
        }
    });
});

//COMMENTS  DESTROY ROUTE
router.delete("/culinarygrounds/:id/comments/:comment_id",middleware.checkCommentsOwner,function(req,res){
    //findbyid and remove
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if (err) {
            res.redirect("back");
        }else{
            req.flash("success","Successfully deleted comment");
            res.redirect("/culinarygrounds/"+req.params.id);     
        }
    });
});


module.exports = router;