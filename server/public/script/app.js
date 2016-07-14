'use strict';

var socket = io();

function init(){

    socket.on('connect', function() {
        //socket.emit('chanel', client.id);
        console.log('connected');
    });

    socket.on('symbol update', function(data) {
        console.log(data);
    });
}


window.onload = init;
