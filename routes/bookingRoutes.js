const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get(
  '/checkout-session/:tourId',
  authController.protect,
  bookingController.getCheckoutSession,
);
router
  .post(
    '/',
    authController.protect,
    authController.restrictTo('admin'),
    bookingController.createBooking,
  )
  .patch(
    '/',
    authController.protect,
    authController.restrictTo('admin'),
    bookingController.updateBooking,
  )
  .delete(
    '/:id',
    authController.protect,
    authController.restrictTo('admin'),
    bookingController.deleteBooking,
  )
  .get(
    '/:id',
    authController.protect,
    authController.restrictTo('admin'),
    bookingController.getBooking,
  )
  .get(
    '/',
    authController.protect,
    authController.restrictTo('admin'),
    bookingController.getAllBookings,
  );

module.exports = router;
