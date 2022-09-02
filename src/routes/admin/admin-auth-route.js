const express = require("express");
const router = express.Router();
const {adminSignup, adminSignin, requireSignin} = require('../../controllers/admin/admin-auth-controller')



router.post("/admin/signup", adminSignup);

router.post("/admin/signin", adminSignin);


module.exports = router;
