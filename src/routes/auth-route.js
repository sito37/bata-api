const express = require("express");
const router = express.Router();
const {signup, signin} = require('../controllers/auth-controller');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require("../validators/auth-validator");



router.post("/signup", validateSignupRequest, isRequestValidated, signup);

router.post("/signin", validateSigninRequest, isRequestValidated, signin);


module.exports = router;
