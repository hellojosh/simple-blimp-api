exports.createRegex = (path) => path.replace(/\/(\w+)/gmi, '/($1|:[a-zA-Z0-9]+)');

exports.createRouteParams = (route, path) => {
  const routeParts = route.split('/');
  const pathParts = path.split('/');
  const pairs = routeParts.map((v, i) => [ v.substring(1), v[0] === ':' ? pathParts[i] : undefined ]);

  return Object.fromEntries(pairs);
};

exports.createFinalSql = (sql, params) => {
  let regex = new RegExp(/\{\{\s*[a-zA-Z0-9]*\s*\}\}/gmi);
  let finalSql = sql.split(regex).reduce((a, c, i) => `${a}${i > 0 ? `$${i}` : ''}${c}`, '');
  let finalSqlValues = (sql.match(regex) || []).map(v => v.replace(/{{\s*(\w+)\s*}}/gmi, (_, key) => params[key]))

  return [ finalSql, finalSqlValues ];
};
