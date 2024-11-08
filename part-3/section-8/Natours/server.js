const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
// console.log(app.get('env'));
// console.log(process.env);

// const { Double } = require('mongodb');

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

// START THE SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
