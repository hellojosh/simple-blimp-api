const restify = require('restify');
const { Client } = require('pg');

const client = new Client()

const { query, getRoute } = require('./src/db');
const { createRegex, createRouteParams, createFinalSql } = require('./src/utilities');
const server = restify.createServer();

server.get('/', (req, res, next) => {
  res.send({
    name: 'simpleblimp',
    version: 0.0,
  });

  next();
});

server.get('*', async (req, res, next) => {
  const path = req.params['*'];
  const method = req.method;

  // 1. Create regex from URL
  const regex = createRegex(path);

  // 2. Create SQL to find route in DB
  const searchSql = 'SELECT route, sql FROM routes WHERE route ~ $1 AND method = $2 LIMIT 1;';

  // 3. get db route and sql
  const [{ route, sql: routeSql }] = await query(searchSql, [ regex, method ]);

  // 4. get dynamic parameters
  const routeParams = createRouteParams(route, path);

  // 5. create sql statement from db
  const [ finalSql, finalSqlValues ] = createFinalSql(routeSql, routeParams);

  // 6. use newly created sql statement to query db
  const data = { path, method, route, routeSql, routeParams, finalSql, finalSqlValues };

  res.send(data);

  next();
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
