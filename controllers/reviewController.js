const AppError = require('./../utils/appError');
// const catchAsync = require('./../utils/catchAsync');
const Review = require('../models/reviewModel');
const factory = require('./handleFactory');

exports.setTourUserIds = (req, res, next) => {
  //allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.createReview = factory.createOne(Review);

exports.getAllReviews = factory.getAll(Review);

exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.getReview = factory.getOne(Review);
