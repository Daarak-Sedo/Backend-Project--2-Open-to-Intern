const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")
const mongoose = require('mongoose');


const createBlog = async (req, res) => {
    try {
        let Blog = req.body
        if (Object.keys(Blog).length == 0) {
            return res.status(400).send({ status: false, msg: "Invalid request Please provide valid Author  details" });
        }
        if (!Blog.title) return res.status(400).send({ msg: " title is required " })
        if (!Blog.body) return res.status(400).send({ msg: "body is required " })
        if (!Blog.authorId) return res.status(400).send({ msg: " authorId is required " })
        if (!Blog.category) return res.status(400).send({ msg: " category is require" })


        let blogCreated = await blogModel.create(Blog)

        res.status(201).send({ status: true, data: blogCreated })
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}


const getBlogsData = async (req, res) => {
    try {

        let input = req.query.authorId

        let isValid = mongoose.Types.ObjectId.isValid(input)
        if (!isValid) return res.status(400).send({ msg: "enter valid objectID" })

        let categorySelected = req.query.category
        if(!categorySelected ) return res.status(400).send({msg:"category not avalible"})

        if (input) {

            let blogs = await blogModel.find({ authorId: input, category: categorySelected, isDeleted: false }).populate("authorId") //ispublished =true not given because it not makes sense

            // if (!blogs) return res.status(404).send({ msg: "no blog found" })

            if (blogs.length == 0) {
                return res.status(404).send({ msg: "Sorry , No data found" });
        }
           else return res.status(200).send({ data: blogs })
        }
        else {
            let blogs = await blogModel.find({ isDeleted: false }).populate("authorId")
            return res.status(200).send({ data: blogs })
        }

    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}



const updateBlog = async (req, res) => {
    try {
        let inputId = req.params.blogId
        let isValid = mongoose.Types.ObjectId.isValid(inputId)
        if (!isValid) return res.status(400).send({ msg: "enter valid objectID" })

        let author = req.body
        let title = req.body.title
        let body = req.body.body
        let tags = req.body.tags
        let subCategory = req.body.subCategory

        if (Object.keys(author).length == 0) {
            return res.status(400).send({ status: false, msg: "Invalid request Please provide valid Author  details" });
        }

        let date = Date.now()

        let alert = await blogModel.findOne({ _id: inputId, isDeleted: true })
        if (alert) return res.status(400).send({ msg: "Blog already deleted" })

        let blogs = await blogModel.findOneAndUpdate({ _id: inputId },
            { $set: { title: title, body: body, isPublished: true, publishedAt: date }, $push: { tags: tags, subCategory: subCategory } }, { new: true })


        if (!blogs) return res.status(404).send({ msg: "no blog found" })
        res.status(200).send({ msg: blogs })
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}


const deleteBlog = async (req, res) => {
    try {
        let inputId = req.params.blogId

        let isValid = mongoose.Types.ObjectId.isValid(inputId)
        if (!isValid) return res.status(400).send({ msg: "enter valid objectID" })
        let date = Date.now()

        let alert = await blogModel.findOne({ _id: inputId, isDeleted: true })
        if (alert) return res.status(409).send({ msg: "Blog already deleted" })

        let data = await blogModel.findOneAndUpdate({ _id: inputId },
            { $set: { isDeleted: true, deletedAt: date } }, { new: true })

        if (!data) return res.status(404).send({ msg: "no data found" })

        res.status(200).send({ status: true, msg: data })
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}



const  deleteBlogQuery = async (req, res) => {
    try {
        const queryParams = req.query;
        if (Object.keys(queryParams).length == 0)
            return res.status(400).send({ status: false, msg: "Please enter some data in the body" });

        const blog = await blogModel.find({ $and: [queryParams, { isDeleted: false }, { isPublished: true }] });

        if (blog.isDeleted == true || blog.length == 0)
            return res.status(404).send({msg: "Document is already Deleted "})
        
        const updatedBlog = await blogModel.updateMany(queryParams, { $set: { isDeleted: true, isPublished: false } }, { new: true });
        return res.status(200).send({ status: true, data: updatedBlog })
    }
    catch (err) {
         res.status(500).send({ error: err.message })
    }
}



module.exports.createBlog = createBlog
module.exports.getBlogsData = getBlogsData
module.exports.updateBlog = updateBlog
module.exports.deleteBlog = deleteBlog
module.exports.deleteBlogQuery = deleteBlogQuery