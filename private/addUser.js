const config = require('./config.js')
const maria = require('mariadb/callback')
const bcrypt = require('bcrypt')

// var connection = maria.createConnection({
//  host: '127.0.0.1',
//  user: 'mysql',
//  password: config.mariadb_password
//  port: 3306
// });
// connection.query("SELECT * from table", (err, rows) => {
//  console.log(rows);
//  connection.end();
// }
//
var addUser = (name, email, password) => {
  var connection = maria.createConnection({
    host: '127.0.0.1',
    user: 'mysql',
    database: 'blog',
    password: config.mariadb_password,
    port: '3306'
  })
  bcrypt.hash(password, 10, (err, hashed) => {
    if (err) console.log(err)
    connection.query(`INSERT INTO authors (name, email, password)
                        VALUES('${name}','${email}','${hashed}')`, (err, rows) => {
      if (err) console.log(err)
      console.log(rows)
      connection.end()
    })
  })
}
addUser(process.argv[2], process.argv[3], process.argv[4])
