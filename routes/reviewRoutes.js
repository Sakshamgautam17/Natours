const express = require('express');
const {
  createReview,
  getAllReviews,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });
router.use(authController.protect);
router
  .route('/')
  .get(getAllReviews)
  .post(
    authController.restrictTo('user', 'admin'),
    setTourUserIds,
    createReview,
  );
router
  .route('/:id')
  .delete(authController.restrictTo('user', 'admin'), deleteReview)
  .patch(authController.restrictTo('user', 'admin'), updateReview)
  .get(getReview);

module.exports = router;
