// schema access (models)
const Campground = require('../models/CampgroundModel');

module.exports.campgroundspage = async (req,res)=>{
    const campgrounds = await Campground.find();
    res.render('campgrounds/index',{campgrounds:campgrounds}); 
}

module.exports.addnewcampground = async (req,res)=>{
    res.render("campgrounds/newcampground");
}

module.exports.addnew = async (req,res)=>{
    // add new campground
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    const campground =  new Campground({ 
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.desc,
        author: author 
    })
    const saved = await campground.save();
    if(saved){
        req.flash("success", "Successfully added a new campground!");
        res.redirect('/campgrounds');
    }
    else{
        req.flash("error", "Some error occurred. Please try again!");
        res.redirect("back");
    }
}

// show a campground info
module.exports.showcampground = async (req,res)=> {
    var foundcampground = await (await Campground.findById(req.params.id)).execPopulate("comments");
    if(foundcampground){
        res.render("campgrounds/campground",{campground:foundcampground});  
    }else{
        req.flash("error", "Couldn't find the campground!");
        res.redirect("back");
    } 
}

// Edit a campground
module.exports.editcampground = async (req,res)=>{
    Campground.findById(req.params.id, (err, foundcampground)=>{
        if(err){
            req.flash("error", "Some error occurred. Please try again!");
            res.redirect("back");
        }
        else{
            res.render("campgrounds/edit",{campground: foundcampground});
        }
    });
}

// update the campground & redirect
module.exports.updatecampground = async (req,res)=>{
    try{
        var foundcampground = await Campground.findById(req.params.id);
        foundcampground.name        = req.body.campground.name;
        foundcampground.price       = req.body.campground.price;
        foundcampground.image       = req.body.campground.image;
        foundcampground.description = req.body.campground.description;
        try{
            const updated = await foundcampground.save();
            req.flash("success", "Campground updated successfully!");
            res.redirect("/campgrounds/" + req.params.id);
        }
        catch(error){
            req.flash("error", "Some error occurred. Please try again!");
            res.redirect("/campgrounds");
        } 
    }
    catch(error){
        req.flash("error", "Some error occurred. Please try again!");
        res.redirect("back");
    }
}

// delete a particular campground
module.exports.deletecampground = async (req,res) =>{
    try {
        Campground.findByIdAndRemove(req.params.id, (err)=>{
            if(err){
                req.flash("error", "Some error occurred. Please try again!");
                res.redirect("/campgrounds");
            }
            else{
                req.flash("success", "Successfully deleted the campground!");
                res.redirect("/campgrounds");
            }
        });
    } catch (error) {
        req.flash("error", "Some error occurred. Please try again!");
        res.redirect("back");
    }
}
  