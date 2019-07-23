/* Blog table */

CREATE TABLE posts (
  ID INT NOT NULL AUTO_INCREMENT,
  title TEXT NOT NULL,
  author VARCHAR(30) NOT NULL,
  storage_path TEXT NOT NULL,
  synopsis TEXT,
  beginning TEXT,
  full_text LONGTEXT NOT NULL,
  tags TEXT NOT NULL,
  ts TIMESTAMP,
  PRIMARY KEY(ID)
);

CREATE TABLE authors (
  ID INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(30) NOT NULL,
  PRIMARY KEY(ID)
);

CREATE TABLE comments (
  ID INT NOT NULL AUTO_INCREMENT,
  blog_id INT NOT NULL,
  full_text MEDIUMTEXT NOT NULL,
  ts TIMESTAMP,
  PRIMARY KEY(ID)
);

CREATE TABLE tags (
  name VARCHAR(30) NOT NULL
);
