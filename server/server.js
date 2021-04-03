const express = require('express');
const app = express();
const port = 4000;
// const axios = require('axios');
// const path = require('path');
const morgan = require('morgan');

app.use(morgan('dev'));

app.get('/test', (req, res) => {
  console.log('reached on server');
  res.end();
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
