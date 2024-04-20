const express            = require('express');
const router             = express.Router({mergeParams: true});
const CommentsController = require("../controllers/CommentsController");
const Middleware         = require("../middleware/index");

// add a new comment
router.get("/new", Middleware.isLoggedIn, CommentsController.newcomment);
router.post("/", Middleware.isLoggedIn, CommentsController.addcomment);

// edit a comment
router.get("/:comments_id/edit", Middleware.checkCommentOwnership, CommentsController.editcomment);
// update a comment
router.put("/:comments_id", Middleware.checkCommentOwnership, CommentsController.updatecomment);

// delete a comment
router.delete("/:comments_id", Middleware.checkCommentOwnership, CommentsController.deletecomment);


module.exports = router;