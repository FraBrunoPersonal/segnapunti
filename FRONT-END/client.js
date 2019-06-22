function nameTeam() {
  var tA = prompt("nome team A");
  var tB = prompt("nome team B");
  app.teamAName = tA;
  app.teamBName = tB;
  /*var element = document.getElementsByClassName("teamA");
  element[0].innerHTML = tA;
  var element = document.getElementsByClassName("teamB");
  element[0].innerHTML = tB;*/
  socket.emit('namesA', ta);
  socket.emit('namesB', tb);
}

$(() => {
  socket = io();

  socket.on('backup', (data) => {
    app.aPoint = data.aPoint;
    app.bPoint = data.bPoint;
    app.aSet = data.aSet;
    app.bSet = data.bSet;
    app.teamAName = data.teamAName;
    app.teamBName = data.teamBName;
  });

  socket.on('namesA', (ta) => {
    app.teamAName = ta;
  });

  socket.on('namesB', (tb) => {
    app.teamBName = tb;
  });

  socket.on('pointA', (pm) => {
    if (pm < 0 && app.aPoint > 0) app.aPoint += pm;
    else if (pm > 0) app.aPoint += pm;
          else if (pm == 0){
            var rispA = confirm("sei sicuro di voler azzerare?");
            if(rispA == true) app.aPoint = pm;
            }
  });

  socket.on('pointB', (pm) => {
    if (pm < 0 && app.bPoint > 0) app.bPoint += pm;
    else if (pm > 0) app.bPoint += pm;
          else if (pm == 0) {
            var rispB = confirm("sei sicuro di voler azzerare?");
            if(rispB == true) app.bPoint = pm;
            }
  });
  socket.on('setA', (pm) => {
    if (pm < 0 && app.aSet > 0) app.aSet += pm;
    else if (pm > 0) app.aSet += pm;
  });
  socket.on('setB', (pm) => {
    if (pm < 0 && app.bSet > 0) app.bSet += pm;
    else if (pm > 0) app.bSet += pm;
  });

  var app = new Vue({
    el: '#app',
    data: {
      aSet: 0,
      bSet: 0,
      aPoint: 0,
      bPoint: 0,
      teamAName: 'Team A',
      teamBName: 'Team B',
    },
    methods: {
      pointA: (pm) => {
        socket.emit('pointA', pm);
      },
      rePointA: (pm) => {
        socket.emit('rePointA', pm);
      },
      pointB: (pm) => {
        socket.emit('pointB', pm);
      },
      setA: (pm) => {
        socket.emit('setA', pm);
      },
      setB: (pm) => {
        socket.emit('setB', pm);
      },
      teamAName: (ta)=>{
        socket.emit('namesA', ta);
      },
      teamBName: (tb)=>{
        socket.emit('namesB', tb);
      },
    }
  })
});
