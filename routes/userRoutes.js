
const express = require('express')
const authencation = require('../middleware/cutomAutentication')
const {
  // errorFull,
  login,
  signUP,
  signUPCreate,
  loginCreate,
  homeSection,
  userLogout,


} = require('../controllers/userController')

const router = express.Router();
router.route('/').get(login)
router.route('/login').get(login).post(loginCreate)
router.route('/signup').get(signUP).post(signUPCreate)

router.route('/home').get(authencation, homeSection)
router.route('/logout').get(authencation, userLogout)
// router.route('*').get(errorFull)




module.exports = router