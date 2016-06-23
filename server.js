var server = require('http').createServer()
  , url = require('url')
  , WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ server: server })
  , express = require('express')
  , app = express()
  , port = 8080;


app.get("/index.js",function(req,res){
	res.sendFile("index.js",{root:"."})
})

app.get("/",function(req,res){
	res.sendFile("index.html",{root:"."})
})
  
  
app.use(function (req, res) {
  res.send({ msg: "hello" });
});

wss.on('connection', function connection(ws) {
  var location = url.parse(ws.upgradeReq.url, true);
  // you might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send(message);
  });

});

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });

