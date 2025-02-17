const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  addUser,
  getUser,
  editUser,
  removeUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto,
} = require('../controllers/userControllers');
const multer = require('multer');
const authController = require('./../controllers/authController');
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotpassword', authController.forgotPassword);
router.patch('/resetpassword/:token', authController.resetPassword);
//protect all the routes after this middle ware
router.use(authController.protect);
router.patch('/updatemypassword', authController.updatePassword);
router.get('/me', getMe, getUser);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete('/deleteMe', deleteMe);

// router.post('/forgotpassword', authController.forgotPassword);

router.use(authController.restrictTo('admin'));

router.route('/').get(getAllUsers).post(addUser);
router.route('/:id').get(getUser).patch(editUser).delete(removeUser);

module.exports = router;
