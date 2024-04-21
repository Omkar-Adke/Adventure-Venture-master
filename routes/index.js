const express  = require('express');
const router   = express.Router();
const passport = require('passport');
const User     = require("../models/UserModel");

router.get("/", (req,res)=>{
    res.render("landing");
})

// <------------------ AUTH ROUTES --------------------->

router.get("/register", (req,res)=>{
    res.render("register");
})

// handle signup logic
router.post("/register", (req,res)=>{
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password,(err, user)=>{
        if(err){            
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res, ()=>{
            req.flash("success", "Welcome to Adventure-Venture " + user.username + "!");
            res.redirect("/campgrounds");
        });
    });
})

// show login form
router.get("/login", (req,res)=>{
    res.render("login"); 
})

// login logic post
// router.post("/login",middleware, callback)
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: 'Welcome back!'
    }),(req,res)=>{
         
});

// logout route
router.get("/logout", (req, res) => {
    req.logout(function(err) {
        if (err) {
            // Handle error, if any
            console.error(err);
        }
        req.flash("success", "Logged out successfully!");
        res.redirect("/campgrounds");
    });
});


// <------------------ END AUTH ROUTES --------------------->


module.exports = router;