const express = require('express');
const userController = require('../controllers/userControllers')
const authController = require('../controllers/authController')
const reviewController = require('../controllers/reviewControllers')

const router = express.Router();


router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)

router.use(authController.protect)

router.patch(
   '/updateMyPassword',
   authController.updatePassWord
   );

router.get('/me', authController.protect,userController.getMe, userController.getUser)
router.patch(
   '/updateMe',
   userController.updateMe)

router.delete(
   '/deleteMe',
   userController.deleteMe)

router.use(authController.restrictTo('admin'))

router
   .route('/')
   .get(userController.getAllUsers)
   .post(userController.createuser)

router
   .route('/:id')
   .get(userController.getUser)
   .patch(userController.updateUser)
   .delete(
           userController.deleteUser)





module.exports = router;