const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(() => console.log('Timer 1 finished'), 0);
setImmediate(() => console.log('Immediate 1 finsished'));

fs.readFile('test-file.txt', () => {
  console.log('I/O finished');
  console.log('------------');

  setTimeout(() => console.log('Timer 2 finished'), 0);
  setTimeout(() => console.log('Timer 3 finished'), 3000);

  setImmediate(() => console.log('Immediate 2 finsished'));

  process.nextTick(() => console.log('Process.nextTick'));

  crypto.pbkdf2('password', 'salt', 10000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 10000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 10000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 10000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
});

console.log('Hey from the top-level code');
