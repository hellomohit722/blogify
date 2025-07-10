const { Router } = require("express");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const multer = require("multer");
const { storage } = require("../service/cloudinary");
const { restrictTo } = require("../middleware/auth");

const router = Router();

const upload = multer({ storage: storage });

router.post("/addNewBlog", restrictTo(["admin", "user"]), upload.single("coverImage"), async (req, res) => {
  try {
    console.log("req.file from Cloudinary:", req.file);

    const { title, body, userId } = req.body;
    if (!title || !body || !req.file || !userId) {
      return res.status(400).json({ error: "Title, body, cover image, and user ID are required" });
    }

    const blog = await Blog.create({
      title,
      body,
      coverImage: req.file.path,
      createdBy: userId,
    });

    res.status(201).json({ blog });

  } catch (err) {
    console.error("Cloudinary Upload Error:", JSON.stringify(err, null, 2));
      res.status(500).json({ error: err.message || "Upload failed" });
  }
});


router.get("/:id", restrictTo(["admin","user"]), async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");
    return res.status(200).json({ blog, comments });
  } catch (err) {
    console.error("Failed to fetch blog:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id",restrictTo(["admin", "user"]),upload.single("coverImage"),async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) return res.status(404).json({ error: "Blog not found" });

      //  Authorisation: allow if admin or blog owner
      const requesterId = req.body.userId;        // sent from the client
      const isAdmin     = req.user?.role === "admin";
      const isOwner     = blog.createdBy.toString() === requesterId;
      if (!isAdmin && !isOwner)
        return res.status(403).json({ error: "You are not allowed to edit this blog" });

      //   Pick up new fields
      const { title, body } = req.body;
      if (title !== undefined) blog.title = title;
      if (body  !== undefined) blog.body  = body;

      //  Replace cover image if a new one was sent
      if (req.file) blog.coverImage = req.file.path;


      await blog.save();
      const populatedBlog = await blog.populate("createdBy");
      res.status(200).json({ blog: populatedBlog });
    } catch (err) {
      console.error("Blog update error:", err);
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  }
);


router.delete("/delete/:blogId", restrictTo(["admin"]), async (req, res) => {
  try {
    const blogId = req.params.blogId;

    await Blog.findByIdAndDelete(blogId);

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ message: "Error deleting blog" });
  }
});

router.post("/comment/:id", restrictTo(["admin","user"]), async (req, res) => {
  try {
    console.log("req.body from comment is ", req.body);
    console.log("req.params from comment is ", req.params);

    await Comment.create({
      content: req.body.content,
      blogId: req.params.id,
      createdBy: req.body.user._id, 
    });

    return res.status(201).json({ message: "Comment created successfully" });
  } catch (err) {
    console.error("Error while creating comment:", err);
    return res.status(500).json({ error: "Failed to create comment" });
  }
});

router.delete("/comment/:id", restrictTo(["admin", "user"]), async (req, res) => {
  try {
    const commentId = req.params.id;

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ message: "Failed to delete comment" });
  }
});

module.exports = router;
