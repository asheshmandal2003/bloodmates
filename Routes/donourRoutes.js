const express = require('express');
const router = express.Router();
const addDonourConroller = require('../Controllers/addDonour')
const addDonourForm = require('../Controllers/donourRegisterform')
const otpValidateController = require('../Controllers/otpValidate')
const viewDonourController = require('../Controllers/viewDonour')
const logincontroller = require('../Controllers/loginControl')
const otpForm = require('../Controllers/otpForm')
const AppError = require('../Utils/AppError')
const AsyncWrap = require('../Utils/AsyncWrap')

//ADD THIS (authcontrol) MIDDLEWARE IN ANY ROUTE TO MAKE IT PRIVATE ROUTE:-
const authControl = require('../Middlewares/authController')

router.get("/forms", addDonourForm)
router.post("/", AsyncWrap(addDonourConroller))
router.get("/register", otpForm)
router.post("/register", AsyncWrap(otpValidateController))
router.post("/login", logincontroller)
router.get("/view", viewDonourController)

module.exports = router