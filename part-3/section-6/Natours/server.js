const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
// console.log(app.get('env'));
// console.log(process.env);

const app = require('./app');

// START THE SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
