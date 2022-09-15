const InternModel = require("../models/internModel");
const CollegeModel = require("../models/collegeModel")
const {isValid,isRightFormatemail,isRightFormatmobile}=require("../validation/validation")


const createInterns = async function (req, res) {
    try {
        let data = req.body
        const { name, email, mobile, collegeName} = data; // getting data  from body 

        //------------validations start------------ 
        if (Object.keys(data) == 0) return res.status(400).send({ status: false, message: "NO data provided" })    // check data is exist | key exist in data

        if (!isValid(name)) { return res.status(400).send({ status: false, message: "Name is required" }) }   // to check keys value 

        if (!isValid(email)) { return res.status(400).send({ status: false, message: "Email is required" }) }

        if (!isRightFormatemail(email)) { return res.status(400).send({ status: false, message: "Please enter a valid email address" }) }

        let duplicateEmail= await InternModel.findOne({email:email})  //to uniq email id
        if(duplicateEmail){ return res.status(400).send({status: false, message: "Email already exist"})}   // check if email address is exist in our collection OR not 

        if (!isValid(mobile)) { return res.status(400).send({ status: false, message: "Mobile is required" }) }

        if (!isRightFormatmobile(mobile)) { return res.status(400).send({ status: false, message: "Please enter a valid mobile number" }) }

        let duplicateMobile= await InternModel.findOne({mobile:mobile})
        if(duplicateMobile){ return res.status(400).send({status: false, message: "Mobile number already exist"})}
     
        // cfind is college id is exist in our collection OR not
        const isMatch= await CollegeModel.findOne({name:collegeName})  
     if(!isMatch){return res.status(400).send({status:false, message:"no such college found "})}
         //-----------validation ends-----------

      data.collegeId = isMatch._id.toString()  //puttting collageId into data(frontend data) from Backend , ab 1 extra input frontend se Milega
      
        const newIntern = await InternModel.create(data);
        let obj={
            name:collegeName,
            email:newIntern.email,
            mobile:newIntern.mobile,
            collegeId :newIntern.collegeId,
            isDeleted:newIntern.isDeleted

        }
        return res.status(201).send({ status: true, message: obj })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message })
    }

}



module.exports.createInterns = createInterns;
