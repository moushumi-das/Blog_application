const router = require("express").Router();
const User = require("../models/User");
const Post= require("../models/Post")
const bcrypt = require("bcrypt");


//create
router.post("/", async (req, res) => {
   const newPost= new Post(req.body)
    try {
        const savedPost= await newPost.save();   
        res.status(200).json(savedPost);
      
      } catch (err) {
      res.status(500).json(err);
    }
});
 
// update
router.put("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }); 

router.delete("/:id", async(req,res)=>{
     try {
            const post = await Post.findById(req.params.id); 
           if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("Post has been deleted")
            } catch (error) {
                res.status(500).json(error)
            }
           } else {
            res.status(401).json("Post can be only deleted by the original user");

           }
        } catch (error) {
            res.status(500).json(error) 
        }
    
  
})


module.exports = router;