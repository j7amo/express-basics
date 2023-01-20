const express = require('express');
const { products } = require('./data');

const app = express();

app.get('/', (req, res) => {
  // "json" method:
  // - converts argument into JSON with the help of "JSON.stringify" method
  // - sets correct "Content-Type" header.
  res.status(200).json(products);
});

app.listen(3333, () => console.log('server is running on port 3333...'));
