const express = require('express')
const reviewController = require('../controllers/reviewControllers');
const authController = require('../controllers/authController');
const Review = require('../models/reviewModel')

const router = express.Router({
    mergeParams:true
}); 

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

router.get('/review-exists/:tourId/:userId', reviewController.checkReview);
  
  module.exports = router;

module.exports = router;