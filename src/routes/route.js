const express = require('express');
const router= express.Router();
const CollegeController= require("../controllers/collegeController");
const InternController= require("../controllers/internController");



router.post("/functionup/colleges",CollegeController.createCollege);

router.post("/functionup/interns",InternController.createInterns);

router.get("/functionup/collegeDetails", CollegeController.getColleges);


//API for wrong route-Of-API
router.all("/*", function (req, res) {
    res.status(400).send({
        status: false,
        message: "The api you request is not available"
    })
})

module.exports= router;
