var can = require('socketcan');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var channel = can.createRawChannel("can1", true);
channel.setRxFilters([{id:153,mask:153},{id:377, mask:377}])

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
    if(msg.id===153){
        carInfo.revs = msg.data.redUIntBE(4, 2)
    } else if (msg.id===377) {
        tempSpeed = msg.data.redUIntBE(2, 3)
        carInfo.speed = (tempSpeed * 0.65) / 100
    }
})

channel.start()

server.listen(3000)