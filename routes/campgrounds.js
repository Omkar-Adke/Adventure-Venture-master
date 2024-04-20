const express               = require('express');
const router                = express.Router();
const CampgroundsController = require("../controllers/CampgroundsController");
const Middleware            = require("../middleware/index");

// view campgrounds
router.get("/", CampgroundsController.campgroundspage);

// add a new campground
router.get("/new", Middleware.isLoggedIn, CampgroundsController.addnewcampground);
router.post("/", Middleware.isLoggedIn, CampgroundsController.addnew);

// view a campground
router.get("/:id", CampgroundsController.showcampground);

// edit view campground
router.get("/:id/edit", Middleware.checkCampgroundOwnership, CampgroundsController.editcampground);

// update campground
router.put("/:id", Middleware.checkCampgroundOwnership, CampgroundsController.updatecampground);

// destroy campground route
router.delete("/:id", Middleware.checkCampgroundOwnership, CampgroundsController.deletecampground);


module.exports = router;