-- create db
CREATE DATABASE simpleblimp;

-- create routes table
CREATE TABLE routes(id SERIAL PRIMARY KEY, route TEXT, method TEXT, sql TEXT);

-- test rows
INSERT INTO routes (route, method, sql) VALUES ('/v1/products/all', 'GET', 'SELECT * FROM products;');
INSERT INTO routes (route, method, sql) VALUES ('/v1/product/:id', 'GET', 'SELECT * FROM products WHERE id = {{id}};');
INSERT INTO routes (route, method, sql) VALUES ('/v1/:type/:id', 'GET', 'SELECT * FROM products WHERE type = "{{ type }}" AND id = {{id}};');

-- text sql
-- find route that matches URL
-- use regex so that route with dynamic parameters can be found
SELECT route, sql
FROM routes
WHERE route ~ '/(v1|:[a-zA-Z0-9]+)/(shoes|:[a-zA-Z0-9]+)/(23|:[a-zA-Z0-9]+)'
  AND method = 'GET'
LIMIT 1;
