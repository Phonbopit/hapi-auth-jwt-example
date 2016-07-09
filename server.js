'use strict';
const Hapi = require('hapi');
const server = new Hapi.Server();
const HapiAuth = require('hapi-auth-jwt2');

let user = {
  id: 1,
  name: 'Chai Phonbopit'
};

server.connection({
  host: 'localhost',
  port: 5000
});

server.register(HapiAuth, err => {
  if (err) {
    return reply(err);
  }

  server.auth.strategy('jwt', 'jwt', {
    key: 'mysecretKey',
    validateFunc: validate
  });
  server.auth.default('jwt');

});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    // Gen token
    reply({
      token: 'token'
    });
  }
});

server.route({
  method: 'GET',
  path: '/me',
  handler: (request, reply) => {
    // Decoding token
    reply(decoded);
  }
});

server.start(() => {
  console.log("Server is running");
});

function validate(decoded, request, callback) {
  if (decoded.name === 'Chai Phonbopit') {
    return callback(null, false);
  } else {
    return callback(null, true);
  }
}