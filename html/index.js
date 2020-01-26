var socket = io.connect('192.168.0.85:3000');

document.addEventListener("DOMContentLoaded", onDomReadyHandler())

function onDomReadyHandler(event) {
    socket.on('carMessage', (data) => {
        var speedo = document.getElementsByTagName('canvas')[0];
        var revs = document.getElementsByTagName('canvas')[1];
        speedo.setAttribute('data-value', data.speed)
        revs.setAttribute('data-value', data.revs)
        console.log(data)
    })
}