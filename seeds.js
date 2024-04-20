var mongoose   = require("mongoose");
const passport = require('passport');
var Campground = require("./models/CampgroundModel");
var Comment    = require("./models/CommentModel");
var User       = require("./models/UserModel");

var seeds = [
    {
        name: "Cloud's Rest", 
        price: "7000",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        price: "9000",
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        price: "10000",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
];

async function seedDB(){
    try {
        await Campground.remove({});
        console.log('Campgrounds removed');
        await Comment.remove({});
        console.log('Comments removed');
        await User.remove({});
        console.log('Users removed');

        var newUser = new User({username: "demo"});
        User.register(newUser, "demo", (err, user)=>{
            if(err){            
                console.log(err);
            }else{
                author = {
                    id: user._id,
                    username: user.username
                };
                console.log("User created with username:'demo' and Password:'demo'");
            }
        });
        await console.log("After creation of user.");

        for(const seed of seeds) {
            let campground = await Campground.create(seed);
            console.log('Campground created');
            let comment = await Comment.create({
                text: 'This place is great, but I wish there was internet',
                author: author
            })
            console.log('Comment created');
            campground.comments.push(comment);
            campground.author.push(author);
            campground.save();
            console.log('Comment added to campground');
        }
    } catch(err) {
        console.log(err);
    }
}

module.exports = seedDB;