const express = require('express');
const { products } = require('./data');

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1><a href="/api/products">Products</a>');
});

app.get('/api/products', (req, res) => {
  // For example, we want to transform data before responding (here we remove "desc"
  // property from every object in the array).
  const responseData = products.map(({
    id, image, name, price,
  }) => ({
    id,
    image,
    name,
    price,
  }));

  res.status(200).json(responseData);
});

// we can also use URL parameters(which are just PLACEHOLDERS)
// and access them via "req.params["name of the route parameter"]"
app.get('/api/products/:productId', (req, res) => {
  const responseData = products.find(
    (product) => product.id === parseInt(req.params.productId, 10),
  );

  // we also should cover the case when we were not able to find data
  if (!responseData) {
    res.status(404).send('Product does not exist!');
    res.end();
  }

  res.status(200).json(responseData);
});

// we can also use SEARCH parameters
app.get('/api/v1/query', (req, res) => {
  // server will get everything that was after "?" sign in the request
  // and put it inside req.query, so that we can access these key-value pairs.
  // For example here we set up the server such that user can specify
  // additional SEARCH parameters (IF needed) and we will handle them.
  // For example the request can have this:
  // "/api/v1/query?search=a&limit=2"
  // We define search parameters names AND quantity as we want it on the server, so the user
  // MUST follow this contract to have this additional functionality.
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  // if user request:
  // - does not contain search parameters;
  // - contains search parameters that are not supported by the server.
  // then we don't provide additional functionality.
  if (search) {
    sortedProducts = sortedProducts.filter((product) => product.name.startsWith(search));
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, parseInt(limit, 10));
  }

  if (sortedProducts?.length < 1) {
    // we can basically respond anyway we want because this is our server:
    // return res.status(200).send('No products match your search!');
    return res.status(200).json({ data: sortedProducts, success: true });
    // by the way we need to use RETURN STATEMENT here because we can only have
    // ONE RESPONSE PER REQUEST. And if we omit the return statement then we will
    // have an error when we try to call "res.status(200).json(sortedProducts)"(in the
    // next couple of lines). Why? Because response has been already sent to the user,
    // and we are trying to set headers, set status and send it once again which is impossible.
  }
  // here we can omit the return statement because there is no more code after it
  // and function basically finishes its execution, BUT it is a good practice
  // to NOT OMIT RETURN STATEMENT:
  return res.status(200).json(sortedProducts);
});

app.get('*', (req, res) => {
  res.status(404).send('<h1>Page Not Found</h1>');
});

app.listen(3333, () => console.log('server is running on port 3333...'));
