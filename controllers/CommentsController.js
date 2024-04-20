// schema access (models)
const Campground = require('../models/CampgroundModel');
const Comment    = require('../models/CommentModel');


module.exports.newcomment = async (req,res) => {
    // find campground by id
    var campground = await Campground.findById(req.params.id);
    if(campground){
        res.render("comments/new", {campground:campground}); 
    }else{
        console.log("Error in Finding the specified campground!");
    } 
}

module.exports.addcomment = async (req,res) => {
    // find campground by id
    var campground = await Campground.findById(req.params.id);
    try {
        if(campground){
            try{
                var comment = new Comment(req.body.comment);
                var commentsaved = await comment.save();
                if(commentsaved){
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;                    
                    comment.save(); 
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added a comment!");
                    res.redirect('/campgrounds/' + campground._id); 
                }
                else{
                    req.flash("error", "Some error occurred. Please try again!");
                    res.redirect("back");
                }
            }
            catch(error){
                req.flash("error", "Some error occurred. Please try again!");
                res.redirect("back");
            }        
        }else{
            req.flash("error", "Some error occurred. Please try again!");
            res.redirect("back");
        }    
    } catch (error) {
        req.flash("error", "Some error occurred. Please try again!");
        res.redirect("back");
    } 
}

// edit comment
module.exports.editcomment = async (req,res)=>{
    Comment.findById(req.params.comments_id, (err, foundComment)=>{
        if(err){
            console.log(err);
            req.flash("error", "Some error occurred. Please try again!");
            res.redirect("back");
        }
        else{
            res.render("comments/edit", {campground_id:req.params.id, comment:foundComment});
        }
    });
}

// update comment
module.exports.updatecomment = async (req,res)=>{
    Comment.findByIdAndUpdate(req.params.comments_id, req.body.comment, (err,updatedComment)=>{
        if(err){
            req.flash("error", "Some error occurred. Please try again!");
            res.redirect("back");
        }
        else{
            req.flash("Success", "Successfully updated the comment!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
}

module.exports.deletecomment = async (req,res)=>{
    try {
        Comment.findByIdAndRemove(req.params.comments_id, (err)=>{
            if(err){
                req.flash("error", "Some error occurred. Please try again!");
                res.redirect("back");
            }
            else{
                req.flash("success", "Successfully deleted the comment!");
                res.redirect("/campgrounds/" + req.params.id);
            }
        });
    } catch (error) {
        req.flash("error", "Some error occurred. Please try again!");
        res.redirect("back");
    }
}