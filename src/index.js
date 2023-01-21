const express = require('express');

const app = express();
const peopleRouter = require('./routes/people');
const authRouter = require('./routes/auth');

app.use(express.static('src/methods-public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// It is generally a good practice to:
// 1) move ROUTES that HAVE SAME BASE PATH
// into a SEPARATE ROUTE file. So we moved:
// - "app.get('/api/people')", "app.post('/api/people')" to "routes/people.js"
// - "app.put('/api/people/:id')", "app.delete('/api/people/:id')" to "routes/people.js"
// - "app.put('/login')" to "routes/auth.js"
// 2) Set up "router" to handle those moved routes inside those files.
// 3) Export those "routers" (in our case we have separate routers for "/api/people" and
// "/login" routes).
// 4) Import (require) those "routers".
// 5) Use them inside "app.use"(we need to pass it to "app.use" BUT
// also we should specify "base path" because we don't want to trigger this middleware
// for any route but only for specific routes starting with "/api/people" for example).
app.use('/api/people', peopleRouter);
app.use('/login', authRouter);

app.listen(3334, () => console.log('server is running on port 3334...'));
