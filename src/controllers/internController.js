const InternModel = require("../models/internModel");
const CollegeModel = require("../models/collegeModel")
const {isValid,isRightFormatemail,isRightFormatmobile}=require("../validation/validation")


const createInterns = async function (req, res) {
    try {
        let data = req.body
        const { name, email, mobile, collegeId } = data;
        //validations 
        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "NO data provided" })

        if (!isValid(name)) { return res.status(400).send({ status: false, msg: "Name is required" }) }

        if (!isValid(email)) { return res.status(400).send({ status: false, msg: "Email is required" }) }

        if (!isRightFormatemail(email)) { return res.status(400).send({ status: false, msg: "Please enter a valid email address" }) }

        let duplicateEmail= await InternModel.findOne({email:email})
        if(duplicateEmail){ return res.status(400).send({status: false, msg: "Email already exist"})}

        if (!isValid(mobile)) { return res.status(400).send({ status: false, msg: "Mobile is required" }) }

        if (!isRightFormatmobile(mobile)) { return res.status(400).send({ status: false, msg: "Please enter a valid mobile number" }) }

        let duplicateMobile= await InternModel.findOne({mobile:mobile})
        if(duplicateMobile){ return res.status(400).send({status: false, msg: "Mobile number already exist"})}
    
        const isMatch= await CollegeModel.findById(collegeId)
        if(!isMatch){return res.status(400).send({status:false, msg:"please enter a valid college id"})}

        //validation ends


        const newIntern = await InternModel.create(data);
        return res.status(201).send({ status: true, msg: newIntern })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }

}



module.exports.createInterns = createInterns;
