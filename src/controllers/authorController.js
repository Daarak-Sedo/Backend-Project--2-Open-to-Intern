const authorModel = require("../models/authorModel")
// const jwt = require("jsonwebtoken")
// const passValidator = require('password-validator');
// const emailValidator = require('email-validator')

const createAuthor = async function (req, res) {
    try {
        let author = req.body
        if (Object.keys(author).length == 0) {
            return res.status(400).send({ status: false, msg: "Invalid request Please provide valid Author  details" });
        }

        if (!author.fname) return res.status(400).send({ msg: " First name is required " })
        if (!author.lname) return res.status(400).send({ msg: " Last name is required " })
        if (!author.email) return res.status(400).send({ msg: " email is required " })
        if (!author.password) return res.status(400).send({ msg: " password is required " })
        let titleEnum = ['Mr', 'Mrs', 'Miss']

        if (!titleEnum.includes(author.title)) {
            res.status(400).send({ status: false, msg: "title should be Mr, Mrs or Miss" })
        }

        let authorCreated = await authorModel.create(author)
        res.status(201).send({ data: authorCreated })
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}







module.exports.createAuthor = createAuthor