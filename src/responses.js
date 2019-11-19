const { query } = require('./db');
const { createRegex, createRouteParams, createFinalSql } = require('./utilities');

exports.callback = async (req, res, next) => {
  const path = req.params['*'];
  const method = req.method;

  // create regex from URL
  const regex = createRegex(path);

  // create SQL to find route in DB
  const searchSql = 'SELECT route, sql FROM routes WHERE route ~ $1 AND method = $2 LIMIT 1;';

  // get db route and sql
  let route;
  let routeSql;

  try {
    const [{ route: _route, sql: _sql }] = await query(searchSql, [ regex, method ]);

    route = _route;
    routeSql = _sql;
  } catch (e) {
    // If the route isn't found return a 404
    res.status(404);
    res.send(['Route Not Found', searchSql, regex, method]);

    next();
  }

  // get dynamic parameters
  const routeParams = createRouteParams(route, path);

  // create sql statement from db
  const [ finalSql, finalSqlValues ] = createFinalSql(routeSql, routeParams);

  // use newly created sql statement to query db
  const results = await query(finalSql, finalSqlValues);

  res.send(results);

  next();
};
