/* Blog table */

CREATE TABLE blogs (
  ID INT NOT NULL IDENTITY(1,1),
  title TEXT NOT NULL,
  author VARCHAR(30) NOT NULL,
  storage_path TEXT NOT NULL,
  synopsis TEXT,
  beginning TEXT,
  full_text LONGTEXT NOT NULL,
  tags TEXT NOT NULL
  ts TIMESTAMP
);
