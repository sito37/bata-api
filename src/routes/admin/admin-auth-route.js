const express = require("express");
const router = express.Router();
// const {requireSignin} = require('../../common-middleware/index')
const {adminSignup, adminSignin, adminSignout} = require('../../controllers/admin/admin-auth-controller');
const { isRequestValidated, validateSignupRequest } = require("../../validators/auth-validator");



router.post("/admin/signup",validateSignupRequest, isRequestValidated, adminSignup);
router.post("/admin/signin", adminSignin);
router.post('/admin/signout', adminSignout )


module.exports = router;
