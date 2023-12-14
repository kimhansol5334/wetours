const Review = require('../models/reviewModel');
const factory = require('./handlerFactory')
const catchAsync = require("../utils/catchAsync")


exports.setTourUserIds = (req,res,next) => {
    if(!req.body.tour) {req.body.tour = req.params.tourId;}
    if (!req.body.user) {
        req.body.user = req.user.id;

    }
    next()
}

exports.getAllReviews = factory.getAll(Review)
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);

exports.checkReview = catchAsync(async (req, res) => {
    try {
      const { tourId, userId } = req.params;
      const reviewExists = await Review.findOne({ tour: tourId, user: userId });
      res.status(200).json({ exists: reviewExists !== null });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
