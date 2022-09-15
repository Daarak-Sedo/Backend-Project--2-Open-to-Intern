const CollegeModel = require("../models/collegeModel");
const InternModel = require("../models/internModel");
const { isValid } = require("../validation/validation")


const createCollege = async function (req, res) {
    try {
        let data = req.body;
        const { name, fullName, logoLink } = data;

        if (Object.keys(data) == 0) return res.status(400).send({ status: false, message: "NO data provided" })   // if user gives no deatils/no blanck obj , 

        if (!isValid(name)) { return res.status(400).send({ status: false, message: "Name is required" }) }
        let duplicateName = await CollegeModel.findOne({ name: name })
        if (duplicateName) { return res.status(400).send({ status: false, message: "College name already exist" }) }

        if (!isValid(fullName)) { return res.status(400).send({ status: false, message: "Full name is required" }) }

        if (!isValid(logoLink)) { return res.status(400).send({ status: false, message: "Logo is required" }) }

        const newCollege = await CollegeModel.create(data);

        let obj = {           //we have to send res like obj that`s why we are using this
            name: newCollege.name,
            fullName: newCollege.fullName,
            logoLink: newCollege.logoLink,
            isDeleted: newCollege.isDeleted
        }
        return res.status(201).send({ status: true, message: obj })
    }
    catch (error) {
        return res.status(500).send({ message: error.message })
    }
}


const getColleges = async function (req, res) {
    try {
        let cName = req.query.collegeName
        if (!cName) { return res.status(400).send({ status: false, message: "College name is required" }) }

        let cId = await CollegeModel.find({ name: cName }).select({ _id: 1 })
        if (cId.length == 0) { return res.status(404).send({ status: false, message: "Please enter a valid name abbreviation in lowercase" }) }

        let interns = await InternModel.find({ collegeId: cId }).select({ name: 1, email: 1, mobile: 1, _id: 1 })

        if (interns.length == 0) {
            var x = `no interns of ${cName} collage`
        } else { var x = interns }

        let result = await CollegeModel.find({ name: cName }).select({ name: 1, fullName: 1, logoLink: 1, _id: 0 })    //_id:0  will not select logoLink   _id:1 will be selected


        const internDeatils = {     //we have to send res like obj that`s why we are using this
            name: cName,
            fullName: result[0].fullName,  //result[o]- bcz result(find) will return arr[{},{}]
            logoLink: result[0].logoLink,
            interns: x        // get all interns[] -related to this college _id
        }
        return res.status(200).send({ status: true, Data: internDeatils })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message })
    }
}




module.exports.createCollege = createCollege;
module.exports.getColleges = getColleges;