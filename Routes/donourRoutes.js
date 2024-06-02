const express = require('express');
const router = express.Router();
const addDonourConroller = require('../Controllers/addDonour')
const otpValidateController = require('../Controllers/otpValidate')
const viewDonourController = require('../Controllers/viewDonour')
const logincontroller = require('../Controllers/loginControl')

router.post("/forms", addDonourConroller)
router.post("/register", otpValidateController)
router.post("/login", logincontroller)
router.get("/view", viewDonourController)

module.exports = router