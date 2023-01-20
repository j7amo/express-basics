// request => Middleware => response
const loggerMiddleware = (req, res, next) => {
  const { method, url } = req;
  const time = new Date().toTimeString();
  console.table({ method, url, time });
  // "next" MUST BE CALLED in order to pass the flow to the next middleware
  next();
  // OR we can send the response right here and end the "request-response" cycle
  // res.send('Hi!');
};

const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === 'john') {
    // "req" object is provided automatically by Express.
    // And the reference to this object does not change throughout the "request-response" cycle.
    // Which is great because we now can:
    // - ATTACH anything we want to THIS "req" OBJECT;
    // - use this ATTACHED DATA LATER in the middleware chain!
    // so here we add a "user" property to the "req" object,
    // and we can use it later in "app.get("/", (req, res) => console.log(req.user))" for example
    req.user = { name: 'john', id: 4 };
    next();
  } else {
    // but if we are unauthorized then we stop "request-response" cycle here in the
    // current middleware
    res.status(401).send('Unauthorized!');
  }
};

module.exports = {
  authorize,
  loggerMiddleware,
};
