const express = require("express");
const Post = require("../models/Post");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

/** ================================
 *  📝 CREATE A NEW POST
 *  ================================ */
// router.post("/create", authMiddleware, async (req, res) => {
//   try {
//     const { title, description, img, isPublic } = req.body;
//     const newPost = new Post({
//       title,
//       description,
//       user: req.user.id, // Authenticated user
//       img,
//       isPublic,
//     });

//     await newPost.save();
//     res
//       .status(201)
//       .json({ message: "Post created successfully", post: newPost });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// });



router.post("/create", authMiddleware, async (req, res) => {
  try {
    // console.log("Authenticated User:", req.user); // Debugging
    
    if (!req.user || !req.user.userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    const { title, description, img, isPublic } = req.body;

    const newPost = new Post({
      title,
      description,
      user: req.user.userId, // Using user ID from middleware
      img,
      isPublic,
    });

    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


/** ================================
 *  📖 GET ALL POSTS (With Pagination & Search)
 *  ================================ */
router.get("/allPosts", async (req, res) => {
  try {
    let { page, limit, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    // Search filter
    let query = { isPublic: true }; // Only public posts
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const posts = await Post.find(query)
      .populate("user", "name email profilePicture")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments(query);

    res.status(200).json({
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      totalPosts,
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/** ================================
 *  🔍 GET A SINGLE POST BY ID
 *  ================================ */
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "user",
      "name email profilePicture"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/** ================================
 *  ✏️ UPDATE A POST
 *  ================================ */
router.put("/:id", authMiddleware, async (req, res) => {
  
  try {
    const post = await Post.findById(req.params.id);
    console.log(post.user.toString(),req.user.userId);
    // if (post.user.toString() !== req.user.id) {
    //   console.log("Post Owner ID:", post.user.toString());
    //   console.log("Logged-in User ID:", req.user.id);
    //   return res
    //     .status(403)
    //     .json({ message: "Unauthorized to update this post" });
    // }
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    // Check if the logged-in user is the owner
    if (post.user.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this post" });
    }

    // Update fields
    post.title = req.body.title || post.title;
    post.description = req.body.description || post.description;
    post.img = req.body.img || post.img;
    post.isPublic =
      req.body.isPublic !== undefined ? req.body.isPublic : post.isPublic;

    await post.save();
    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/** ================================
 *  🗑️ DELETE A POST
 *  ================================ */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // console.log(post)
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    if (post.user.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this post" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/** ================================
 *  ❤️ LIKE / UNLIKE A POST
 *  ================================ */
router.put("/:id/like", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    console
    const userId = req.user.id;
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }
    
    await post.save();
    res
      .status(200)
      .json({ message: "Post liked/unliked", likes: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/** ================================
 *  💬 ADD A COMMENT TO A POST
 *  ================================ */
router.post("/:id/comment", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = {
      user: req.user.id,
      text: req.body.text,
    };

    post.comments.push(newComment);
    await post.save();
    res.status(201).json({ message: "Comment added", comments: post.comments });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/** ================================
 *  ❌ DELETE A COMMENT
 *  ================================ */
router.delete(
  "/:postId/comment/:commentId",
  authMiddleware,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) return res.status(404).json({ message: "Post not found" });

      post.comments = post.comments.filter(
        (comment) => comment._id.toString() !== req.params.commentId
      );
      await post.save();
      res
        .status(200)
        .json({ message: "Comment deleted", comments: post.comments });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }
);

module.exports = router;
