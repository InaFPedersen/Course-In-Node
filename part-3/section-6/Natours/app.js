const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from middleware!!!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// MOUNT ROUTERS
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// ROUTE HANDLERS
// app.get('/api/v1/tours', getAllTours); // GET ALL TOURS
// app.get('/api/v1/tours/:id', getSpecificTour); // GET A SPECIFIC TOUR
// app.post('/api/v1/tours', createANewTour); // CREATE A NEW TOUR
// app.patch('/api/v1/tours/:id', updateASpecificTour); // UPDATE A SPECIFIC TOUR
// app.delete('/api/v1/tours/:id', deleteASpecificTour); // DELETE A SPECIFIC TOUR

module.exports = app;
