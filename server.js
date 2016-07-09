'use strict';
const Hapi = require('hapi');
const server = new Hapi.Server();
const HapiAuth = require('hapi-auth-jwt2');
const JWT = require('jsonwebtoken');

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
  config: {
    auth: false
  },
  handler: (request, reply) => {

    let token = JWT.sign(user, 'mysecretKey', {
      expiresIn: '7d'
    });

    // Gen token
    reply({
      token: token
    });
  }
});

server.route({
  method: 'GET',
  path: '/me',
  handler: (request, reply) => {
    reply(request.auth.credentials);
  }
});

server.start(() => {
  console.log("Server is running");
});

function validate(decoded, request, callback) {
  if (decoded.name === 'Chai Phonbopit') {
    return callback(null, true);
  } else {
    return callback(null, false);
  }
}