const express = require('express');
const {
  getAllTours,
  addTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getTourWithin,
  getDistances,
  uploadUserPhoto,
  resizeTourImages,
} = require('../controllers/tourControllers.js');
const authController = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes.js');
const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);
//middleware
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
// router.param('id', CheckId);
router.route('/tour-stats').get(getTourStats);
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getTourWithin);

router.route('/distances/:latlng/unit/:unit').get(getDistances);

router
  .route('/')
  .get(getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    addTour,
  );
router
  .route('/:id')
  .get(getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    uploadUserPhoto,
    resizeTourImages,
    updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    deleteTour,
  );

module.exports = router;
