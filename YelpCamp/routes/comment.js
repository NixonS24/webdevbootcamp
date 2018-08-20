var express = require("express");
var router  = express.Router({mergeParams: true});

//Models
var Campground      = require("../models/campground");
var Comment         = require("../models/comment");
    
//Middlware
var middleware = require("../middleware"); //will automatically include index.js file because this is the home director


//Index
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//Create -  add comment to DB
router.post("/", middleware.isLoggedIn, function(req,res){
    var newComment = req.body.comment; //already preformatted
    
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            Comment.create(newComment, function(err, comment){
                if(err){
                    req.flash("error","Something went wrong");
                } else {
                    //add username and id to comments
                    //This informaation must be here, otherwise our middleware will block access.
                    //Formating is the key here - we need to format to our schema specification. 
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    //console.log(comment);
                    req.flash("succss","Successfully added comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
    //Lookup campground using ID
    //create new comment
    //connect new comment to campground
    //redirect campground show page.
});

//Show - not included because incoporated into "campgrounds/:id" route

//Edit - edit comments
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    //req.params.id = CampgroundId, where req.params.comment_id = CommentID;
    //Both are vailable beacause there are in or url
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err || !foundCampground){
           req.flash("error","No campground found");
           res.redirect("back")
       } else {
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err || !foundComment){
                    req.flash("error","comment not find");
                    res.redirect("back");
                } else {
                    res.render("comments/edit", {campgroundIdThroughParams: req.params.id, comment: foundComment});
                }
            });  
        }
    });
});

//Update Route - Comments
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/" + req.params.id )
        }
    });
});

//Delete Route - Destroy Comments
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(error){
      if(error){
          res.redirect("back");
      } else {
          req.flash("success", "Comment deleted");
          res.redirect("/campgrounds/" + req.params.id);
      }
   });
});


module.exports = router;
