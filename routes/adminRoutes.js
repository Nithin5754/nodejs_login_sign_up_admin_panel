const express = require('express')
const router = express.Router()
const adminAthentication = require('../middleware/adminAuthentication')

const { adminLoginPage,
  adminCreate,
  adminHomePage,
  adminSignOut,
  deleteItem,
  blockUser,
  UnBlockUser,
  reUpdateUsers,
  getUpdateUser
} = require('../controllers/adminController')

router.route('/admin').get(adminLoginPage).post(adminCreate)
router.route('/adminHome').get(adminAthentication, adminHomePage)
router.route('/signout').get(adminAthentication, adminSignOut)
router.route('/adminHome/delete/:userId').post(deleteItem)
router.route('/adminHome/block/:userId').post(blockUser)
router.route('/adminHome/unblock/:userId').post(UnBlockUser)
router.route('/adminHome/update/:userId').get(getUpdateUser).post(reUpdateUsers)





module.exports = router
