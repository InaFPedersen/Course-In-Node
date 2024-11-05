const express = require('express');

const tourController = require('./../controllers/tourController');

// ROUTES
const router = express.Router();

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createANewTour);

router
  .route('/:id')
  .get(tourController.getSpecificTour)
  .patch(tourController.updateASpecificTour)
  .delete(tourController.deleteASpecificTour);

module.exports = router;
