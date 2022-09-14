const CollegeModel = require("../models/collegeModel");
const InternModel = require("../models/internModel");
const {isValid,isRightFormatemail,isRightFormatmobile}=require("../validation/validation")


const createCollege = async function (req, res) {
    try {
        let data = req.body;
        console.log(data)
        const { name, fullName, logoLink } = data;
        
        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "NO data provided" })

        if (!isValid(name)) { return res.status(400).send({status: false, msg:"Name is required"}) }

        let duplicateName= await CollegeModel.findOne({name:name})
        if(duplicateName){ return res.status(400).send({status: false, msg: "Can't create new college. College name already exist"})}

        if (!isValid(fullName)) { return res.status(400).send({status:false, msg: "Full name is required"}) }

        if (!isValid(logoLink)) { return res.status(400).send({status:false, msg:"Logo is required"}) }

        const newCollege = await CollegeModel.create(data);
        return res.status(201).send({ status: true, msg: newCollege })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }
}

const getColleges = async function (req, res) {
    try {
        let cName = req.query.collegeName
        if (!cName) { return res.status(400).send({status: false, msg:"College name is required"}) }

        let cId = await CollegeModel.find({ name: cName }).select({ _id: 1 })
        if (cId.length==0) {return res.status(404).send({status:false, msg:"Please enter a valid name abbreviation in lowercase"})}
        
        let interns = await InternModel.find({ collegeId: cId }).select({ name: 1, email: 1, mobile: 1, _id: 1 })
        let result = await CollegeModel.find({ name: cName }).select({ name: 1, fullName: 1, logoLink: 1, _id: 0 })

        const obj = {
            name: result[0].name,
            fullName: result[0].fullName,
            logoLink: result[0].logoLink,
            interests: interns
        }
        return res.status(200).send({ status: true, data: obj })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }
}




module.exports.createCollege = createCollege;
module.exports.getColleges = getColleges;