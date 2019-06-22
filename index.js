const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

const door = 3000;
//const ip = '127.0.0.1';

const admin = {
  passw: 'volley'
}

const data = {
  aPoint: 0,
  bPoint: 0,
  aSet: 0,
  bSet: 0,
  teamAName: 'Team A',
  teamBName: 'Team B',
}

app.use(express.static(__dirname + '/'));
http.listen(door /*, ip || '127.0.0.1'*/ , () => {
  console.log('http module listening at *:' + door);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/FRONT-END/DISPLAY.html'));
});

app.get('/admin', (req, res) => {
  if (req.query.passw == admin.passw) res.sendFile(path.join(__dirname + '/FRONT-END/ADMIN.html'));
  else res.send('Wrong password<br>The right sintax is: *:' + door + '?passw=password');
});

io.on('connection', (socket) => {
  socket.emit('backup', data);
  socket.on('pointA', (pm) => {
    if (pm < 0 && data.aPoint > 0) data.aPoint += pm;
    else if (pm > 0) data.aPoint += pm;
      else if (pm == 0) data.aPoint = pm
    io.emit('pointA', pm);
  });
  socket.on('pointB', (pm) => {
    if (pm < 0 && data.bPoint > 0) data.bPoint += pm;
    else if (pm > 0) data.bPoint += pm;
      else if (pm == 0) data.bPoint = pm
    io.emit('pointB', pm);
  });
  socket.on('setA', (pm) => {
    if (pm < 0 && data.aSet > 0) data.aSet += pm;
    else if (pm > 0) data.aSet += pm;
    io.emit('setA', pm);
  });
  socket.on('setB', (pm) => {
    if (pm < 0 && data.bSet > 0) data.bSet += pm;
    else if (pm > 0) data.bSet += pm;
    io.emit('setB', pm);
  });
  socket.on('namesA', (ta) => {
    data.teamAName = ta;
    io.emit('namesA', ta);
  })
  socket.on('namesB', (tb) => {
    data.teamBName = tb;
    io.emit('namesB', tb);
  })
});
