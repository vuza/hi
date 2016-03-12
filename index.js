var express = require('express'),
    io = require('socket.io')(3001), //TODO => config
    app = express();

var u1 = {},
    u2 = {};

io.on('connect', function(socket){
    socket.on('myPeer', function(opt){
        var signal = opt.signal,
            room = opt.room;

        if(signal && socket && room){
            addAndConnectClient(signal, socket, room);
        }
    });
});

app.listen(3000); //TODO => config

var clients = {};
var addAndConnectClient = function(signal, socket, room){
    if(clients[room]){
        // Oh there already is at least one client

        if(clients[room].length >= 2){
            // We do not connect more then two users
            //TODO inform client
            return;
        }

        if(!clients[room][socket.id]){
            // There already is the first, but not the second client, add it
            clients[room][socket.id] = {signal: signal, socket: socket};
        }
    } else {
        clients[room] = {};
        clients[room][socket.id] = {signal: signal, socket: socket};
    }

    console.log(clients);

    if(clients[room].length == 2){
        // Yay, we got both

        console.log('both')
        //clients[room][1].socket.emit('signal', clients[room][0].signal);
    }
};