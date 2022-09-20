require('dotenv').config({ path: './config.env' });

const express = require('express');
const cors = require('cors');

const dbo = require('./db/conn');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(require('./routes/records'));

// Global error handling
// app.use(function (err, _req, res) {
//   console.error(err);
//   res.status(500).send('Something broke!');
// });

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});

// create empty get route
app.get('/', (_req, res) => {
  res.send('Hello World!');
});
