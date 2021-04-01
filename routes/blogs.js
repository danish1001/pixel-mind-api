const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const Blogs = require("../models/Blogs");

// -----------------------------------------------Admin Approval for a blog
// @route       POST api/Blogs/admin:id
// @desc        Get all user blogs
// @access      Private
router.post("/adminApprove/:blogId", [auth], async (req, res) => {
  try {
    const id = req.params.blogId;
    Blogs.findOne({_id: id}, (err, foundBlog) => {
      if(err) {
        res.json({err});
      } else {
        // blog is getting approved by admin
        foundBlog.isApprovedByAdmin = true;
        foundBlog.save();
        res.json(foundBlog);
      }
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


//-------------------------------------------------Employee Approval for a blog
// @route       POST api/Blogs/admin:id
// @desc        Get all user blogs
// @access      Private
router.post("/employeeApprove/:blogId", [auth], async (req, res) => {
  try {
    const id = req.params.blogId;
    Blogs.findOne({_id: id}, (err, foundBlog) => {
      if(err) {
        res.json({err});
      } else {
        // blog is getting approved by Employee
        foundBlog.isApprovedByEmployee = true;
        if(foundBlog.isApprovedByEmployee && foundBlog.isApprovedByAdmin == true) {
          foundBlog.finalApproval = true;
        }
        foundBlog.save();
        res.json(foundBlog);
      }
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route       GET api/Blogs
// @desc        Get all user blogs------------Customer blogs
// @access      Private
router.get("/", auth, async (req, res) => {
  try {
    const blogs = await Blogs.find({user: req.user.id});
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       POST api/Blogs
// @desc        Add new blogs to a user-----------customer blogs
// @access      Private
router.post(
  "/",
  [auth,
      [
          check("blogHeading", "blogHeading is required").not().isEmpty(),
          check("BlogContent", "BlogContent is required").not().isEmpty()
      ]
  ],
  async (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      const {blogHeading, BlogContent} = req.body;
      try {
          const newBlog = new Blogs({
            blogHeading,
            BlogContent,
            isApprovedByAdmin: false,
            isApprovedByEmployee: false,
            user: req.user.id // id is accessed because we are using auth
          });
          const blog = await newBlog.save();
          res.json(blog);
      } catch (err) {
          console.error(err.message);
          res.status(500).send("server error");
      }
  }
);

// @route       PUT api/Blogs
// @desc        Update a contact
// @access      Private
router.put("/:id", (req, res) => {
  res.send("Update contact");
});

// @route       DELETE api/Blogs
// @desc        Delete a contact
// @access      Private
router.delete("/:id", (req, res) => {
  res.send("Delete contact");
});


module.exports = router;