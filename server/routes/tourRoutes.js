const express = require("express");
const tourController = require("../controllers/tourControllers");
const authController = require("../controllers/authController")
const reviewController = require("../controllers/reviewControllers")
const reviewRouter = require("./reviewRoutes")

const router = express.Router();

// router.param("id", tourController.checkId);

router.use('/:tourId/reviews', reviewRouter);

router
  .route("/top-5-tours")
  .get(tourController.aliasTopTours, tourController.getAllTours)

router
  .route("/")
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin','lead-guide'),
    tourController.createTour
  );

router 
  .route('/tour-stats')
  .get(tourController.getTourStats);

router 
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo( 'admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );
  
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin)

router
  .route('/distances/:latlng/unit/:unit')
  .get(tourController.getDistances)

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(  
    authController.protect,
    authController.restrictTo('admin','lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin','lead-guide'),
    tourController.deleteTour
  );



  //its duplicated,  so we have to find a better way.

module.exports = router;
