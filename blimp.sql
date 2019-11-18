-- create db
CREATE DATABASE simpleblimp;

-- create routes table
CREATE TABLE routes(id SERIAL PRIMARY KEY, route TEXT, method TEXT, sql TEXT);
CREATE TABLE products(id SERIAL PRIMARY KEY, title TEXT, type TEXT);

-- test rows
INSERT INTO routes (route, method, sql) VALUES ('/v1/products/all', 'GET', 'SELECT * FROM products;');
INSERT INTO routes (route, method, sql) VALUES ('/v1/products/:type', 'GET', 'SELECT * FROM products WHERE type = {{ type }};');
INSERT INTO routes (route, method, sql) VALUES ('/v1/product/:id', 'GET', 'SELECT * FROM products WHERE id = {{id}};');
INSERT INTO routes (route, method, sql) VALUES ('/v1/:type/:id', 'GET', 'SELECT * FROM products WHERE type = {{ type }} AND id = {{id}};');
INSERT INTO products (title, type) VALUES ('Chuck Taylor All Star High Top', 'shoes');
INSERT INTO products (title, type) VALUES ('Chuck Taylor All Star Low Top', 'shoes');
INSERT INTO products (title, type) VALUES ('Astros Baseball Cap', 'hat');

-- test sql
-- find route that matches URL
-- use regex so that route with dynamic parameters can be found
SELECT route, sql
FROM routes
WHERE route ~ '/(v1|:[a-zA-Z0-9]+)/(shoes|:[a-zA-Z0-9]+)/(23|:[a-zA-Z0-9]+)'
  AND method = 'GET'
LIMIT 1;
