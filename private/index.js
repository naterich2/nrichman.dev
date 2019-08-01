const express = require('express')
const path = require('path')
const fs = require('fs')
const config = require('./config.js')
const mime = require('mime')
const maria = require('mariadb')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const bp = require('body-parser')
const cookies = require('cookie-parser')
const util = require('util')
const helmet = require('helmet')

const writeFile = util.promisify(fs.writeFile)
const app = express()
app.use(express.static(path.join(__dirname, '../public')))
app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())
app.use(cookies())
app.use(helmet())

function log (message) {
  console.log(new Date().toLocaleTimeString({ month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit' }) + ': ' + message)
}
const logIn = async function (username, password, res) {
  let conn
  try {
    const conn = await maria.createConnection({
      host: '172.17.0.1',
      user: 'mysql',
      password: config.mariadb_password,
      database: 'blog',
      port: 3306
    })
    const queryResult = await conn.query('SELECT ID,password,name FROM authors WHERE email=?;', [username])
    const eq = await bcrypt.compare(password, queryResult[0].password)
    if (eq) {
      const token = await jwt.sign({ username: username, name: queryResult[0].name, ID: queryResult[0].ID }, config.secret, { expiresIn: '1h' })
      res.cookie('token', token, { httpOnly: true })
      res.sendStatus(200)
    } else {
      res.sendStatus(403)
    }
  } catch (e) {
    log(e)
  } finally {
    if (conn) conn.end()
  }
}
const addBlog = async function (token, res, title, synopsis, beginning, tags, fulltext) {
  let conn
  try {
    const authorized = await jwt.verify(token, config.secret)
    const conn = await maria.createConnection({
      host: '172.17.0.1',
      user: 'mysql',
      password: config.mariadb_password,
      database: 'blog',
      port: 3306
    })
    await writeFile(path.join(__dirname, config.blog, title + '.md'), fulltext)
    const rows = await conn.query('INSERT INTO posts (title, authorID, storagePath,' +
      'synopsis, content) VALUES(?,?,?,?,?);', [
      title,
      authorized.ID,
      path.join(__dirname, config.blog, title + '.md'),
      synopsis,
      fulltext
    ])
    await addTags(rows.insertId, tags)
    res.sendStatus(200)
  } catch (e) {
    log(e)
    res.sendStatus(500)
  } finally {
    if (conn) conn.end()
  }
}
const addTags = async function (id, tagsRaw) {
  let conn
  const tags = tagsRaw.split(',').map(e => e.trim())
  try {
    const conn = await maria.createConnection({
      host: '172.17.0.1',
      user: 'mysql',
      password: config.mariadb_password,
      database: 'blog',
      port: 3306
    })
    // First insert any new tags into the tags db
    const rows = await conn.query('SELECT tagName FROM tags;') // eslint-disable-line no-unused-vars
    const databaseTags = rows.map(e => e.tagName)
    const uniqueTags = tags.filter(e => !databaseTags.includes(e))
    const sub = uniqueTags.reduce((all, curr) => all = [...all, [curr]], []) // eslint-disable-line no-return-assign
    const qs = 'INSERT INTO tags (tagName) VALUES (?);'
    // https://stackoverflow.com/questions/37719975/how-to-do-bulk-insert-in-mariadb-using-nodejs
    if (sub.length > 0) { await conn.batch(qs, sub) }

    const postTags = tags.reduce((all, curr) => all = [...all, [id, curr]], [])// eslint-disable-line no-return-assign
    const postTagsQS = 'INSERT INTO postTags(postID, tagID) SELECT ?, ID FROM tags WHERE tagName = ?'
    // await conn.batch(postTagsQS, postTags)
    //  get "This command is not supported in the prepared statement protocol yet"
    //  I believe that INSERT ... SELECT is not available in batch
    postTags.map(async (curr) => { await conn.query(postTagsQS, [...curr]) })
  } catch (err) {
    console.log(err)
  } finally {
    if (conn) conn.end()
  }
}
app.get('/resources/blog/blog/:id', (req, res) => {
  maria.createConnection({
    host: '172.17.0.1',
    user: 'mysql',
    password: config.mariadb_password,
    database: 'blog',
    port: 3306
  })
    .then(conn => {
      conn.query('SELECT * FROM posts WHERE ID=' + req.params.id + ';')
        .then(rows => {
          res.setHeader('Content-Type', 'application/json')
          res.json(rows[0])
          log('New request for blog ' + req.params.id + ' sending')
          console.log(rows[0])
          conn.end()
        })
        .catch(err => {
          log(err)
          conn.end()
        })
    })
    .catch(err => {
      log(err)
    })
})
app.get('/resources/blog/recent', (req, res) => {
  maria.createConnection({
    host: '172.17.0.1',
    user: 'mysql',
    database: 'blog',
    password: config.mariadb_password,
    port: '3306'
  })
    .then(conn => {
      conn.query('SELECT posts.*, authors.name FROM posts JOIN authors on authors.ID=posts.authorID ORDER BY ts LIMIT 5')
        .then(rows => {
          res.setHeader('Content-Type', 'application/json')
          // res.json(rows) ??
          res.json(rows)
          conn.end()
        })
        .catch(err => {
          log(err)
          conn.end()
        })
    })
    .catch(err => {
      log(err)
    })
})
app.get('/resources/blog/tag/:tag', (req, res) => {
  maria.createConnection({
    host: '172.17.0.1',
    user: 'mysql',
    password: config.mariadb_password,
    database: 'blog',
    port: 3306
  })
    .then(conn => {
      conn.query("SELECT posts.title, posts.authorID FROM postTags\
        JOIN posts ON posts.ID=postTags.postID\
        JOIN authors ON authors.ID=posts.authorID\
        WHERE postTags.tagID = ?;", [req.params.tag])
        .then(rows => {
          res.setHeader('Content-Type', 'application/json')
          res.json(rows)
          conn.end()
        })
        .catch(err => {
          log(err)
          conn.end()
        })
    })
    .catch(err => {
      log(err)
    })
})
app.get('/resources/blog/tags', (req, res) => {
  maria.createConnection({
    host: '172.17.0.1',
    user: 'mysql',
    password: config.mariadb_password,
    database: 'blog',
    port: 3306
  })
    .then(conn => {
      conn.query('SELECT * FROM tags')
        .then(rows => {
          res.setHeader('Content-Type', 'application/json')
          res.json(rows)
          conn.end()
        })
        .catch(err => {
          log(err)
          conn.end()
        })
    }).catch(err => {
      log(err)
    })
})
app.get('/resources/blog/author/:authorID', (req, res) => {
  maria.createConnection({
    host: '172.17.0.1',
    user: 'mysql',
    password: config.mariadb_password,
    database: 'blog',
    port: 3306
  })
    .then(conn => {
      conn.query('SELECT * FROM posts WHERE authorID=?;', [req.params.authorID])
        .then(rows => {
          res.setHeader('Content-Type', 'application/json')
          res.json(rows)
          conn.end()
        })
        .catch(err => {
          log(err)
          conn.end()
        })
    }).catch(err => {
      log(err)
    })
})
app.get('/resources/blog/authors', (req, res) => {
  maria.createConnection({
    host: '172.17.0.1',
    user: 'mysql',
    password: config.mariadb_password,
    database: 'blog',
    port: 3306
  })
    .then(conn => {
      conn.query('SELECT * FROM authors;')
        .then(rows => {
          res.setHeader('Content-Type', 'application/json')
          res.json(rows)
          conn.end()
        })
        .catch(err => {
          console.log(err)
          conn.end()
        })
    }).catch(err => {
      console.log(err)
    })
})
app.post('/resources/blog/add', (req, res) => {
  const token = req.cookies.token
  console.log(req.body, req.cookies)
  if (!token) {
    res.status(403).send('No token provided')
  } else {
    addBlog(token, res, req.body.title, req.body.synopsis, req.body.beginning,
      req.body.tags, req.body.fulltext)
  }
})
app.get('/', (req, res) => {
  const dir = path.resolve(path.join(__dirname, '../public'))
  res.sendFile('index.html', { root: dir }, (err) => {
    res.end()
    if (err) throw (err)
  })
})
app.get('/resume', (req, res) => {
  const dir = path.resolve(path.join(__dirname, '../public'))
  res.sendFile('index.html', { root: dir }, (err) => {
    res.end()
    if (err) throw (err)
  })
})
app.get('/blog*', (req, res) => {
  const dir = path.resolve(path.join(__dirname, '../public'))
  res.sendFile('index.html', { root: dir }, (err) => {
    res.end()
    if (err) throw (err)
  })
})
app.get('/resources/images', (req, res) => {
  // Request for random image from pictures dir
  const pictures = path.join(__dirname, config.pictures)
  fs.readdir(pictures, (err, files) => {
    if (err) console.log(err)
    const file = files[Math.floor(Math.random() * files.length)]
    res.setHeader('Content-Type', mime.getType(path.join(pictures, file)))
    log('New request for picture from' + req.headers['user-agent'] + ', sending file ' + file)
    res.sendFile(path.join(pictures, file))
  })
})
app.get('/resources/verifyToken', (req, res) => {
  const token = req.cookies.token
  if (!token) {
    res.sendStatus(401)
  } else {
    try {
      const authorized = jwt.verify(token, config.secret)
      log('verifyToken: sending authorized')
      res.status(200).json({ username: authorized.name })
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        log('verifyToke: sending unauthorized')
        res.sendStatus(401)
      } else {
        res.sendStatus(403)
        log('verifyToke: sending forbidden')
      }
    }
  }
})
app.post('/login', (req, res) => {
  if (req.cookies && req.cookies.token) {
    jwt.verify(req.cookies.token, config.secret, (err, resp) => {
      if (err.name === 'TokenExpiredError') {
        log('login: expired token, sending a new one')
        logIn(req.body.username, req.body.password, res)
      } else {
        req.sendStatus(400)
      }
    })
  } else {
    log('login: new login request from ' + req.body.username)
    logIn(req.body.username, req.body.password, res)
  }
})

app.listen(3000, () => console.log('Running on port 3000'))
