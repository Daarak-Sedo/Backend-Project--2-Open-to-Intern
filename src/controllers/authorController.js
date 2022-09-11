const authorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require('mongoose');


const createAuthor = async function (req, res) {
    try {
        let author = req.body

         //<------Checking Whether Request Body is empty or not----------->//
        if (Object.keys(author).length == 0) {
            return res.status(400).send({ status: false, msg: "Invalid request Please provide valid Author  details" }); }

        if (!author.fname) return res.status(400).send({ msg: " First name is required " })
        if (!author.lname) return res.status(400).send({ msg: " Last name is required " })
        if (!author.email) return res.status(400).send({ msg: " email is required " })
        if (!author.password) return res.status(400).send({ msg: " password is required " })

        //<-------Validation of Title----------->//
        let titleEnum = ['Mr', 'Mrs', 'Miss']

        if (!titleEnum.includes(author.title)) {
            res.status(400).send({ status: false, msg: "title should be Mr, Mrs or Miss" })
        }
  
        let checkEmail = await authorModel.findOne({email:author.email})
        if(checkEmail) return  res.status(409).send({msg: "Email already exists"}) // conflict for Duplication 409
    //<-------Author Creation----------->//
        let authorCreated = await authorModel.create(author)
        res.status(201).send({ data: authorCreated })
        
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}



//<---------------This function is used for Logging an Author----------------->//
const login = async function (req, res) {
    try {
        const email = req.body.email
        const password = req.body.password

         // if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "No input provided" })

        if( !(req.body.email && req.body.password ) ){
          return res.status(400).send({status : false, msg : "All fields are mandatory."})
       }
        
         // if (email.trim().length == 0 || password.trim().length == 0) { return res.status(400).send({ status: false, msg: "please provide RIGHT GMAIL fORMET ", })}
        
        const userMatch = await authorModel.findOne({ email: email, password: password })

        if (!userMatch) return res.status(400).send({ status: false, msg: "Email or Password is incorrect" })



        const token = jwt.sign({
            userId: userMatch._id , batch: "Radon", project:"blog"
        }, "Secret-Key")

        res.setHeader("x-api-key", "token");

        return res.status(200).send({ status: true, msg: "You are successfully logged in", token })

    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }
}





module.exports.createAuthor = createAuthor;
module.exports.login = login