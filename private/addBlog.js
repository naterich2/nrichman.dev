const path = require('path');
const fs = require('fs');
const config = require('./config.js');
const maria = require('mariadb/callback');


//var connection = maria.createConnection({
//  host: '127.0.0.1',
//  user: 'mysql',
//  password: config.mariadb_password
//  port: 3306
//});
//connection.query("SELECT * from table", (err, rows) => {
//  console.log(rows);
//  connection.end();
//}
//
var addBlog = (title, author, storage, synopsis, beginning, tags) => {
  var connection = maria.createConnection({
    host: '127.0.0.1',
    user: 'mysql',
    database: 'blog',
    password: config.mariadb_password,
    port: '3306'
  });
  fs.readFile(storage, (err,data) => {
    if(err) console.log(err);
    console.log("File Exists")
    connection.query(`INSERT INTO blogs (title,author,storage_path,synopsis,beginning,tags)
                      VALUES('${title}','${author}','${storage}','${synopsis}','${beginning}','${tags}')`, (err, rows) => {
      if(err) console.log(err);
      console.log(rows);
      connection.end();
    });
  });
}
console.log(process.argv);
addBlog(process.argv[2],process.argv[3],process.argv[4],process.argv[5],process.argv[6],process.argv[7]);
