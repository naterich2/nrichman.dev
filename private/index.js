const express = require('express');
const path = require('path');
const fs = require('fs');
const config = require('./config.js');
const mime = require('mime');
const maria = require('mariadb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bp = require('body-parser');
const cookies = require('cookie-parser');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
let app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(bp.urlencoded({extended: false}));
app.use(bp.json());
app.use(cookies());

function log(message){
  console.log(new Date().toLocaleTimeString({month: 'short', day: 'numeric',
    year: 'numeric', hour: '2-digit', minute:'2-digit', second: '2-digit'})+': '+message);
}
const logIn = async function(username, password, res){
  try {
    const conn = await maria.createConnection({
      host: '172.17.0.1',
      user: 'mysql',
      password: config.mariadb_password,
      database: 'blog',
      port: 3306
    });
    const query_result = await conn.query("SELECT password,name FROM authors WHERE email=?;",[username]);
    const eq = await bcrypt.compare(password, query_result[0].password);
    if(eq){
      const token = await jwt.sign({'username': username,'name': query_result[0].name}, config.secret, {expiresIn:"1h"});
      res.cookie('token', token, {httpOnly: true});
      res.sendStatus(200);
      conn.end();
    } else {
      res.sendStatus(403);
    }
  } catch(e){
    log(e)
  }
}
const addBlog = async function(token, res, title, synopsis, beginning, tags, fulltext){
  try {
    const authorized = await jwt.verify(token, config.secret);
    const conn = await maria.createConnection({
      host: '172.17.0.1',
      user: 'mysql',
      password: config.mariadb_password,
      database: 'blog',
      port: 3306
    });
    await writeFile(path.join(__dirname,config.blog,title+'.md'), fulltext);
    await conn.query('INSERT INTO posts (title, author, storage_path,'+
      'synopsis, beginning, tags, full_text) VALUES(?,?,?,?,?,?,?);',[
        title,
        authorized.name,
        path.join(__dirname,config.blog,title+'.md'),
        synopsis,
        beginning,
        tags,
        fulltext
      ]);
    res.sendStatus(200);
  } catch(e){
    log(e);
    res.sendStatus(500);
  }
}
app.get('/resources/blog/blog_id/:id', (req, res) => {
  maria.createConnection({
    host: '172.17.0.1',
    user: 'mysql',
    password: config.mariadb_password,
    database: 'blog',
    port: 3306
  })
    .then(conn => {
      conn.query('SELECT * FROM posts WHERE ID='+req.params.id+';')
      .then( rows => {
        res.setHeader('Content-Type','application/json');
        res.json(rows[0]);
        conn.end();
      })
      .catch( err => {
        console.log(err);
      })
    .catch(err => {
      console.log(err)
    })
  })
});
app.get('/resources/blog/recent', (req, res) => {
  maria.createConnection({
    host: '172.17.0.1',
    user: 'mysql',
    database: 'blog',
    password: config.mariadb_password,
    port: '3306'
  })
    .then(conn => {
      conn.query("SELECT * FROM posts ORDER BY ts LIMIT 5")
      .then(rows => {
        res.setHeader('Content-Type', 'application/json');
        //res.json(rows) ??
        res.json(rows);
        conn.end();
      })
      .catch(err => {
        log(err);
      });
    })
    .catch(err => {
      log(err);
    });
});
app.get('/resources/blog/blog_info', (req,res) => {
  maria.createConnection({
    host: '172.17.0.1',
    user: 'mysql',
    database: 'blog',
    password: config.mariadb_password,
    port: '3306'
  })
    .then(conn => {
      console.log("test")
      conn.query("SELECT name FROM authors;")
      .then((rows1, meta1) => {
        conn.query("SELECT name FROM tags")
          .then((rows2, meta2) => {
            res.setHeader('Content-Type', 'application/json');
            res.json([rows1[0],rows2[0]]);
            //res.json(rows) ??
            //res.json(rows);
            conn.end();
          })
          .catch(err => {
            log(err);
          })
      })
      .catch(err => {
        log(err);
      });
    })
    .catch(err => {
      log(err);
    });

});
app.get('/resources/blog/tag/:tag', (req,res)=>{
  var connection = maria.createConnection({
    host: '127.0.0.1',
    user: 'mysql',
    password: config.mariadb_password,
    database: 'blog',
    port: 3306
  });
  connection.query("SELECT * FROM blogs WHERE tags LIKE \'"+req.params.tag+"\';", (err, rows) => {
    console.log(rows);
    //res.json(rows) ??
    connection.end();
  });
})
app.get('/', (req, res) => {
  const dir = path.resolve(path.join(__dirname, '../public'));
  res.sendFile('index.html', {root: dir}, (err) => {
    res.end();
    if(err) throw(err);
  });
});
app.get('/resume', (req, res) => {
  const dir = path.resolve(path.join(__dirname, '../public'));
  res.sendFile('index.html', {root: dir}, (err) => {
    res.end();
    if(err) throw(err);
  });
});
app.get('/blog*', (req,res) => {
  const dir = path.resolve(path.join(__dirname, '../public'));
  res.sendFile('index.html', {root: dir}, (err) => {
    res.end();
    if(err) throw(err);
  });
})
app.get('/resources/images', (req, res) => {
  //Request for random image from pictures dir
  const pictures = path.join(__dirname,config.pictures);
  fs.readdir(pictures, (err,files) => {
    if(err) console.log(err);
    const file = files[Math.floor(Math.random()*files.length)];
    res.setHeader('Content-Type', mime.getType(path.join(pictures,file)));
    log('New request for picture from'+req.headers['user-agent']+', sending file '+file);
    res.sendFile(path.join(pictures,file));
  });
});
app.get('/resources/verifyToken', (req, res) => {

  let token = req.cookies.token;
  if(!token){
    res.sendStatus(401);
  } else {
    try {
      const authorized = jwt.verify(token,config.secret);
      log("verifyToke: sending authorized")
      res.status(200).json({'username':authorized.name});
    } catch(e) {
      if(e.name == 'TokenExpiredError'){
        log("verifyToke: sending unauthorized")
        res.sendStatus(401);
      }
      else{
        res.sendStatus(403);
        log("verifyToke: sending forbidden")
      }
    }
  }
})
app.post('/login', (req,res) =>{
  if(req.cookies && req.cookies.token){
    jwt.verify(req.cookies.token, config.secret,(err, resp) => {
      if(err.name == 'TokenExpiredError'){
        log("login: expired token, sending a new one")
        logIn(req.body.username, req.body.password, res);
      } else {
        req.sendStatus(400);
      }
    })
  } else {
    log("login: new login request from "+req.body.username)
    logIn(req.body.username, req.body.password, res);
  }
});
app.post('/resources/blog/add', (req, res) => {
  let token = req.cookies.token;
  console.log(req.body, req.cookies)
  if(!token) {
    res.status(403).send("No token provided");
  } else {
    addBlog(token, res, req.body.title, req.body.synopsis, req.body.beginning,
      req.body.tags, req.body.fulltext);
  }
});



app.listen(3000, () => console.log("Running on port 3000"));
