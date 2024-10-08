const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

/* ---------------------------FILES-----------------------------*/
// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt');
// console.log('File written!');

// Non-block, asynchronous way
// fs.readFile('./text/start.txt', 'utf-8', (err, data) => {
//   console.log(data);
// });
// console.log('Will read file!');

/* ---------------------------SERVER-----------------------------*/
// CREATE SERVER
// const server = http.createServer((req, res) => {
//   console.log(req);
//   res.end('Hello from the server!');
// });

// // START SERVER
// server.listen(8000, '127.0.0.1', () => {
//   console.log('Listening to request on port 8000');
// });

// CREATE SERVER - ROUTING

// Executed once when you start
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);

const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
// console.log(slugs);

// console.log(slugify('Fresh Avocados', { lower: true }));

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  // const pathName = req.url;

  // OVERVIEW PAGE
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    // console.log(cardsHtml);

    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);
  }

  // PRODUCT PAGE
  else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }

  // API
  else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  }

  // NOT FOUND
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page NOT found!</h1>');
  }
});

// START SERVER
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
});
