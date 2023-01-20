const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');

const { authorize, loggerMiddleware } = require('../utils');

const app = express();

// we can add middleware functions to the server setup with 2 different approaches:
// 1) by using "use" method
app.use([authorize, loggerMiddleware]);
app.use(morgan('tiny'));
// 2) by passing middleware as a 2nd argument to the HTTP method
// app.get('/', loggerMiddleware, (req, res) => {
//   res.send('home');
// });
// By the way we can:
// - pass "path" as a 1st argument to the "use" method if we want to apply middleware only
// to some specific routes("path" is matched in "startsWith" style,
// so if we set "app.use("/api", loggerMiddleware)") then "/api/123/hello?abc=123"
// will be also matched and middleware will be invoked);
// - pass an array of middlewares (remember! ORDER MATTERS!)
app.get('/', (req, res) => {
  res.send('home');
});

app.get('/about', (req, res) => {
  res.send('about');
});

app.listen(3333, () => console.log('server is running on port 3333...'));
