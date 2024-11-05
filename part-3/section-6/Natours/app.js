const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1) MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from middleware!!!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// ROUTES - Tours
// GET ALL TOURS
const getAllTours = (req, res) => {
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
const getSpecificTour = (req, res) => {
  // console.log(req.params);

  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID!',
    });
  }

  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
};

// CREATE A NEW TOUR
const createANewTour = (req, res) => {
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
const updateASpecificTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID!',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tours: '<Udated tour here..>',
    },
  });
};

// DELETE A SPECIFIC TOUR
const deleteASpecificTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID!',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// ROUTES - USERS
// Get all users
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

// Get a specific user
const getASpecificUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

// Create a new user
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

// Update a specific user
const updateASpecificUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

// Delete a specific user
const deleteASpecificUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

// ROUTE HANDLERS
// app.get('/api/v1/tours', getAllTours); // GET ALL TOURS
// app.get('/api/v1/tours/:id', getSpecificTour); // GET A SPECIFIC TOUR
// app.post('/api/v1/tours', createANewTour); // CREATE A NEW TOUR
// app.patch('/api/v1/tours/:id', updateASpecificTour); // UPDATE A SPECIFIC TOUR
// app.delete('/api/v1/tours/:id', deleteASpecificTour); // DELETE A SPECIFIC TOUR

app.route('/api/v1/tours').get(getAllTours).post(createANewTour);

app
  .route('/api/v1/tours/:id')
  .get(getSpecificTour)
  .patch(updateASpecificTour)
  .delete(deleteASpecificTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getASpecificUser)
  .patch(updateASpecificUser)
  .delete(deleteASpecificUser);

// START THE SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
