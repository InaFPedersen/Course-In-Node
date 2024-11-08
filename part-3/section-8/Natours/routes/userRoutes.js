const express = require('express');

const userController = require('./../controllers/userController');

// ROUTES
const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getASpecificUser)
  .patch(userController.updateASpecificUser)
  .delete(userController.deleteASpecificUser);

module.exports = router;
