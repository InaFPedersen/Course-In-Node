const fs = require('fs');
const Tour = require('./../models/tourModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

// ROUTES HANDLERS
// GET ALL TOURS
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours: tours,
    // },
  });
};

// GET A SPECIFIC TOUR
exports.getSpecificTour = (req, res) => {
  // console.log(req.params);

  const id = req.params.id * 1;

  // const tour = tours.find((el) => el.id === id);

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tours: tour,
  //   },
  // });
};

// CREATE A NEW TOUR
exports.createANewTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //  tours: newTour,
    // },
  });
};

// UPDATE A SPECIFIC TOUR
exports.updateASpecificTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    // data: {
    //   tours: '<Udated tour here..>',
    // },
  });
};

// DELETE A SPECIFIC TOUR
exports.deleteASpecificTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
