const express = require('express')
const { requireSignin, adminMiddleware } = require('../common-middleware')
const { adminSignin } = require('../controllers/admin/admin-auth-controller')
const { addCategory, getCategories } = require('../controllers/category-controller')
const router = express.Router()


router.post('/category/create', requireSignin, adminMiddleware, addCategory )
router.get('/category/getcategories', getCategories)

module.exports = router