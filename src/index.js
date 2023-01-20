// SERVING NAVBAR-APP WITH EXPRESS
const express = require('express');
// const path = require('path');

const app = express();

// to serve STATIC(the ones that server does NOT have to CHANGE BUT only SERVE)
// FILES (images, styles, scripts) with Express:
// - put these files into "PUBLIC"(name convention) folder;
// - pass "express.static('./public)" built-in middleware to the "use" function;
// - call "app.use" method to ADD MIDDLEWARE functions to the "request-response" cycle.
// What this built-in middleware effectively DOES:
// - sets up the path;
// - sets up MIME types;
// - sets status codes;
// We don't have to do it on our own anymore!
app.use(express.static('./public'));

// const myLogger = function (req, res, next) {
//   console.log('LOGGED');
//   next();
// };
// app.use(myLogger);
// MIDDLEWARES RULES:
// 1) Middlewares will be invoked for each and every request BEFORE the routes.
// 2) The order of middleware loading is important: middleware functions that are loaded first
// are also executed first. If "myLogger" is loaded after the route to the root path,
// the request never reaches it and the app doesn't print “LOGGED”,
// because the route handler of the root path terminates the request-response cycle.

// app.get('/', (req, res) => {
//   // So basically to respond with a file we have 3 APPROACHES:
//   // 1) "per-file" approach with "sendFile"
//   // 2) "express.static" middleware with all static files inside "public" folder
//   // 3) SSR(server-side rendering) with the help of template engines (e.g. Handlebars)
//   // res.status(200).sendFile(path.resolve(__dirname, './navbar-app/index.html'));
// });

app.all('*', (req, res) => {
  res.status(404).send('resource not found');
});

app.listen(3333, () => {
  console.log('server is running on port 3333');
});
