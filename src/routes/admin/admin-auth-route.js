const express = require("express");
const router = express.Router();
const {adminSignup, adminSignin} = require('../../controllers/admin/admin-auth-controller');
const { isRequestValidated, validateSignupRequest } = require("../../validators/auth-validator");



router.post("/admin/signup",validateSignupRequest, isRequestValidated, adminSignup);

router.post("/admin/signin", adminSignin);


module.exports = router;
