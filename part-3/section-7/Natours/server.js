const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
// console.log(app.get('env'));
// console.log(process.env);

const app = require('./app');
const { Double } = require('mongodb');

//DB
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

// Moongoose
mongoose
  .connect(DB, {
    //.connect(process.env.DB_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    // console.log(con.connections);
    console.log('DB connection successful!');
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Forest Hiker',
  rating: 4.7,
  price: 497,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('ERROR 💥 :', err);
  });

// START THE SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
