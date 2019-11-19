const restify = require('restify');
const { callback } = require('./src/responses');

const server = restify.createServer();

// TODO: create middleware
// TODO: check for API key
// TODO: support JWT

server.get('/', (req, res, next) => {
  res.send({
    name: 'simple blimp',
    version: 0.0,
  });

  next();
});

server.get('*', callback);
server.post('*', callback);
server.put('*', callback);
server.del('*', callback);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
