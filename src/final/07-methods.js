// API for CRUD operations
const express = require('express');
const { people } = require('../data');

const app = express();

// set up middleware for serving static assets
app.use(express.static('src/methods-public'));

// IF we are working with built-in HTML mechanism for FORM submission(so
// that "Content-Type" header of the request is "application/x-www-form-urlencoded"),
// we need to set up middleware for parsing incoming requests with such URL-encoded
// payloads (request body).
// "express.urlencoded" middleware:
// - parses the payload;
// - creates a new "body" property on "req" object.
// This "body" property is an object populated with parsed data
// from the FORM ("body" has key-value pairs where "key"="name of the input field");
app.use(express.urlencoded({ extended: false }));

// IF we are working with request payloads in JSON format (e.g. we prevent default HTML mechanism
// for form submission with JS "preventDefault" method and send the data in JSON format
// via fetch/axios instead), then we need another middleware - "express.json".
// This middleware also does parsing and creating "body" object with parsed data on "req" object,
// but this time "Content-Type" header of the request is "application/json; charset=utf-8"
app.use(express.json());

// GET (READ operation) example:
app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people });
});

// POST (CREATE operation) example 1:
app.post('/login', (req, res) => {
  const { name } = req.body;

  if (name) {
    return res.status(200).send(`Welcome ${name}!`);
  }

  return res.status(401).send('Please provide a name!');
});

// POST (CREATE operation) example 2:
app.post('/api/people', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return (
      res
        .status(400)
        // we return JSON-stringified object with "msg" field from the server
        // just because it is expected on the frontend side
        // p.s. by the way "success" field is completely made-up - we can return any key-value
        // pairs we want!
        .json({ success: false, msg: 'please provide name!' })
    );
  }

  return res.status(201).json({ success: true, person: name });
});

// PUT (UPDATE operation)
app.put('/api/people/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((item) => item.id === Number(id));

  if (person) {
    const updatedPeople = people.map((item) => {
      if (item.id === person.id) {
        return {
          ...item,
          name,
        };
      }

      return item;
    });

    return res.status(200).json({ success: true, data: updatedPeople });
  }

  return res
    .status(404)
    .json({ success: false, msg: `no person with id ${id}` });
});

// DELETE (DELETE operation)
app.delete('/api/people/:id', (req, res) => {
  const { id } = req.params;

  const person = people.find((item) => item.id === Number(id));

  if (person) {
    const updatedPeople = people.filter((item) => item.id !== person.id);

    return res.status(200).json({ success: true, data: updatedPeople });
  }

  return res
    .status(404)
    .json({ success: false, msg: `no person with id ${id}` });
});

app.listen(3334, () => console.log('server is running on port 3334...'));
