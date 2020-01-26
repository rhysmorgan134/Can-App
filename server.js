var can = require('socketcan');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var channel = can.createRawChannel("vcan0", true);

var carInfo = {};
carInfo.speed = 0
carInfo.revs = 0

app.use(express.static(__dirname + "/html"));
app.use('/scripts', express.static(__dirname + '/node_modules/canvas-gauges/'));

io.on('connection', function(client) {
    console.log('client connected')
})

setInterval(() => {
    io.emit('carMessage', carInfo)
}, 100)

channel.addListener("onMessage", function(msg) { 
    carInfo.revs = msg.data.readUIntBE(0, 4)
    carInfo.speed = msg.data.readUIntBE(4, 2)
    console.log(carInfo)
})

channel.start()

server.listen(3000)