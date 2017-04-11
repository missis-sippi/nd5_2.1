'use strict';

const http = require('http');
const port = 3000;
const server = http.createServer();

const options = {
  hostname: 'netology.tomilomark.ru',
  path: '/api/v1/hash',
  method: 'POST',
  port: 3000,
  headers: {
    'Content-Type': 'application/json',
    'firstname' : ''
  }
};


server.listen(port)
  .on('error', err => {
    console.error(err);
  })

  .on('request', (request, response) => {
    let data = '', ans = '';

    request.on('error', err => {
      console.error(err);
    });
    request.on('data', chunk => {
      data += chunk;
    });

    request.on('end', () => {
    var user = JSON.stringify(request.headers.firstname);

        const req = http.request(options, res => {
          res.on('data', chunk => {
            ans += chunk
          });
          res.on('end', () => {
            console.log(ans);
          });

        });

        response.writeHead(200, 'OK', {'Content-Type': 'application/json'});
        req.write(ans);
        req.end();

      });

      // response.writeHead(200,{'Content-Type': 'application/json'});
      response.write(data);
      response.end();
    })

  .on('listening', () => {
    console.log(`Start HTTP on port ${port}`);
  });