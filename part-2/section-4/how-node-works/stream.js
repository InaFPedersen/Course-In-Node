const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // SOLUTION 1
  // fs.readFile('test-file.txt', (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });
  // SOLUTION 2
  // const readable = fs.createReadStream('test-file.txt');
  // readable.on('data', (chunk) => {
  //   // console.log('Im a chunk');
  //   res.write(chunk);
  // });
  // readable.on('end', () => {
  //   // console.log('I finished');
  //   res.end();
  // });
  // readable.on('error', (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end('File not found!');
  // });

  // SOLUTION 3
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening...');
});
