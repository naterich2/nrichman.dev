const express = require('express')
const path = require('path')
const fs = require('fs')
const config = require('./config.js')
const mime = require('mime')

function log(message){
  console.log(new Date().toLocaleTimeString({month: 'short', day: 'numeric',
    year: 'numeric', hour: '2-digit', minute:'2-digit', second: '2-digit'})+': '+message);
}

let app = express()
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  const dir = path.resolve(path.join(__dirname, '../public'));
  res.sendFile('index.html', {root: dir}, (err) => {
    res.end();
    if(err) throw(err);
  });
});

app.get('/resources*', (req, res) => {
  //Request for random image from pictures dir
  if(req.url == '/resources/images'){
    const pictures = path.join(__dirname,config.pictures);
    fs.readdir(pictures, (err,files) => {
      if(err) console.log(err);
      const file = files[Math.floor(Math.random()*files.length)];
      res.setHeader('Content-Type', mime.getType(path.join(pictures,file)));
      console.log(req.headers)
      log(`New request for picture from ${req.headers['user-agent']}, sending file ${file}`);
      res.sendFile(path.join(pictures,file));
    });
  }
});

app.post('/resources*', (req, res) => {
  let latitude = encodeURIComponent(req.body.latitude);
  let longitude = encodeURIComponent(req.body.longitude);
  let units = decodeURIComponent(req.body.units);

//  let url = `https://api.darksky.net/forecast/${config.weather_key}/${latitude},${longitude}?units=${units}`
//  https.get(url, (err, res, body))
});


app.listen(3000, () => console.log("Running on port 3000"));
