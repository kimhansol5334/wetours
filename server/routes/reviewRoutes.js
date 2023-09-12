const express = require('express')
const reviewController = require('../controllers/reviewControllers');
const authController = require('../controllers/authController');

const router = express.Router({
    mergeParams:true
}); //tourId 를 params로 받기위해서 하는 작업인것 같다.

router.use(authController.protect)

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview)

router.route('/:id')
  .get(reviewController.getReview)
  .patch(authController.restrictTo('user','admin'),reviewController.updateReview)
  .delete(authController.restrictTo('user','admin'),reviewController.deleteReview)

module.exports = router;