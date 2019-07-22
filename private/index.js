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
app.get('/resume', (req, res) => {
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

  let url = "https://api.darksky.net/forecast/"+config.weather_key+"/"+latitude+","+longitude+"?units="+units;
  https.get(url, (err, res, body) => {
    let weather = {}
    let data = JSON.parse(body)

    //https://github.com/JasonPuglisi/descent/blob/master/server.js
    let icons = {
      'clear-day': 'day-sunny',
      'clear-night': 'night-clear',
      'rain': 'rain',
      'snow': 'snow',
      'sleet': 'sleet',
      'wind': 'cloudy-gusts',
      'fog': 'fog',
      'cloudy': 'cloudy',
      'partly-cloudy-day': 'day-cloudy',
      'partly-cloudy-night': 'night-alt-cloudy',
      'hail': 'hail',
      'thunderstorm': 'thunderstorm',
      'tornado': 'tornado'
     };

     weather.summary = data.minutely.summary;
     weather.temp = data.currently.temperature;
     weather.unit = units === 'us' ? 'F' : 'C';
     weather.icon = icons[data.currently.icon];
     res.json(weather);
  });
});


app.listen(3000, () => console.log("Running on port 3000"));
