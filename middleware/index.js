// schema access (models)
const Campground = require('../models/CampgroundModel');
const Comment    = require('../models/CommentModel');


module.exports.isLoggedIn = async (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}

module.exports.checkCampgroundOwnership = async (req, res, next)=>{
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundcampground)=>{
            if(err){
                req.flash("error", "Campground not found!");
                res.redirect("back");
            }
            else{
                if(foundcampground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

module.exports.checkCommentOwnership = async (req, res, next)=>{
    if(req.isAuthenticated()){
        Comment.findById(req.params.comments_id, (err, foundComment)=>{
            if(err){
                req.flash("error", "Something went wrong. Please try again!");
                res.redirect("back");
            }
            else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}