/* Blog table */

CREATE TABLE blogs (
  id VARCHAR(10),
  title TEXT NOT NULL,
  author VARCHAR(30) NOT NULL,
  storage_path TEXT NOT NULL,
  synopsis TEXT NOT NULL,
  beginning TEXT NOT NULL,
  tags TEXT NOT NULL
  ts TIMESTAMP
);
