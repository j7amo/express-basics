// SERVING NAVBAR-APP WITH BUILT-IN HTTP MODULE
const http = require('http');
const { readFileSync } = require('fs');

// in order to serve application from the NAVBAR-APP folder
// we have to read the files that are in that folder to get the content
// for the server responses(IMPORTANT! More than one response will be needed!).
// When browser sends a GET request to the "/" root resource it receives a server
// response with "index.html". Then browser starts parsing it and creating the DOM.
// While parsing the HTML file browser will find links to the needed resources such as:
// - styles
// - images
// - scripts etc.
// If the link is ABSOLUTE then it's 99% external, and we are not serving it from the server.
// BUT if the link is RELATIVE then we ARE SERVING it from the server(files ARE on the server).
// So in our case browser will send MORE REQUESTS after getting "/" resource (which is index.html):
// - "/styles.css"
// - "/browser-app.js"
// - "/logo.svg"
// So we have to make our "requestListener" to (1)check for these URLs when it receives request
// from the browser AND (2)respond with correct headers and content.
// Which is not convenient! Let's imagine that we 1000 resources.
// If are using just built-in HTTP NodeJS module then we have to EXPLICITLY SERVE EACH resource!
const homePageHtml = readFileSync('src/navbar-app/index.html');
const styles = readFileSync('src/navbar-app/styles.css');
const browserApp = readFileSync('src/navbar-app/browser-app.js');
const logo = readFileSync('src/navbar-app/logo.svg');

const server = http.createServer((req, res) => {
  // we can use "req" object (which is GIANT by the way!) and access different useful props:
  // see what resource is requested:
  // console.log(req.url);
  // see what method is used:
  // console.log(req.method);
  // see what headers are used:
  // console.log(req.headers);
  // write headers.
  // 'Content-Type' is CRITICAL!
  // It sets the MIME(media) type of response content
  // so that browser can understand how to parse it and render(interpretation).
  // For example:
  // - 'Content-Type': 'text/PLAIN' + res.write('<h1>Home Page</h1>') =>
  // results in browser rendering <h1>Home Page</h1> as a TEXT node.
  // - 'Content-Type': 'text/HTML' + res.write('<h1>Home Page</h1>') =>
  // results in browser rendering it as an HTML element.
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    // write content of server response
    // res.write('<h1>Home Page</h1>');
    res.write(homePageHtml);
    // we MUST call END METHOD ON EACH RESPONSE to let the server know that
    // response is sent, and it can close the response stream.
    res.end();
  } else if (req.url === '/styles.css') {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.write(styles);
    res.end();
  } else if (req.url === '/browser-app.js') {
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.write(browserApp);
    res.end();
  } else if (req.url === '/logo.svg') {
    res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
    res.write(logo);
    res.end();
  } else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>About Page</h1>');
    res.end();
  } else {
    // notice different status code
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h1>Page not found!</h1>');
    res.end();
  }
});

server.listen(3333);
