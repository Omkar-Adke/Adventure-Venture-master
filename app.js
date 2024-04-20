const express        = require('express');
const app            = express();
const port           = process.env.PORT || 3000;
const mongoose       = require('mongoose');
const passport       = require('passport');
const LocalStrategy  = require('passport-local');
const url            = 'mongodb://localhost:27017/Adventure-Venture';
const seedDB         = require('./seeds');
const methodOverride = require('method-override');
const flash          = require('connect-flash');

// acquire routes
const commentRoutes    = require('./routes/comments');
const campgroundRoutes = require('./routes/campgrounds');
const indexRoutes      = require('./routes/index');
// acquiring User model
const User = require("./models/UserModel");

mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false});
const con      = mongoose.connection;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.use(flash());       // flash messages plugin

app.locals.moment = require('moment');          // moments plugin for timings..

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash("success");
    next();  
})

con.on('open', () => {
    console.log("Connected to db...");
})

// seedDB();            // seeding the DB

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// use routes
app.use("/",indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})