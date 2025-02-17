const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');
const port = process.env.PORT || 6969;
const mongoose = require('mongoose');
const DB = process.env.CONNECTION_STRING;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful');
  });

console.log(app.get('env'));
//console.log(process.env);
const server = app.listen(port, () => {
  console.log(`Listening on port - ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
