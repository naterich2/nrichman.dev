/* post table */
CREATE TABLE authors (
  ID INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(30) NOT NULL,
  password TEXT NOT NULL,
  PRIMARY KEY(ID)
);

CREATE TABLE tags (
  ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  tagName VARCHAR(30) NOT NULL
);

CREATE TABLE posts (
  ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title TEXT NOT NULL,
  authorID INT NOT NULL REFERENCES authors (ID),
  storagePath TEXT NOT NULL,
  synopsis TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  tags TEXT NOT NULL,
  ts TIMESTAMP
);


CREATE TABLE comments (
  ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  blogID INT NOT NULL REFERENCES posts (ID),
  content  MEDIUMTEXT NOT NULL,
  ts TIMESTAMP
);


CREATE TABLE postTags (
  postID INT NOT NULL REFERENCES posts (ID),
  tagID INT NOT NULL REFERENCES tags (ID),
  CONSTRAINT pkPostTags PRIMARY KEY (postID, tagID)
);

