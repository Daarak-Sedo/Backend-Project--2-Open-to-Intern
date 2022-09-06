const express = require('express');
const router = express.Router();

const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")



router.post("/authors", authorController.createAuthor)

router.post("/Blogs", blogController.createBlog)

router.get("/getBlogs",blogController.getBlogsData)

router.put("/updateBlog/:blogId",blogController.updateBlog)


router.delete("/deleteBlog/:blogId", blogController.deleteBlog)

router.delete("/deleteBlogQuery",blogController.deleteBlogQuery)

module.exports = router;