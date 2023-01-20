// EXPRESS JS BASICS
// get factory function
const express = require('express');

// invoke it and get the Express instance
const app = express();

// it's the same as checking the value of "req.url" in built-in "http" module
app.get('/', (req, res) => {
  res.status(200).send('Home Page');
});

app.get('/about', (req, res) => {
  res.status(200).send('About Page');
});

// if we want to respond to a request to the non-existing resource we can do this:
app.all('*', (req, res) => {
  res.status(404).send('<h1>Resource not found!</h1>');
});

// spin-up the server
app.listen(3333, () => {
  console.log('server is running on port 3333');
});
