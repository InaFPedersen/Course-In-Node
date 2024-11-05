const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID!',
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
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

// GET A SPECIFIC TOUR
exports.getSpecificTour = (req, res) => {
  // console.log(req.params);

  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
};

// CREATE A NEW TOUR
exports.createANewTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: 'Could not create the new tour!',
        });
      }

      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    }
  );
};

// UPDATE A SPECIFIC TOUR
exports.updateASpecificTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours: '<Udated tour here..>',
    },
  });
};

// DELETE A SPECIFIC TOUR
exports.deleteASpecificTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
