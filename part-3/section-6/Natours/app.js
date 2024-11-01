const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// ROUTES
// GET ALL TOURS
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
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

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
