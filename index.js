var express = require('express'),
    https = require('https'),
    fs = require('fs'),
    app = express();

var u1 = {},
    u2 = {};

var credentials = {key: fs.readFileSync('/etc/letsencrypt/live/hi.alagoda.at/privkey.pem', 'utf8'), cert: fs.readFileSync('/etc/letsencrypt/live/hi.alagoda.at/fullchain.pem', 'utf8')};
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(3000);

var io = require('socket.io')(httpsServer);

io.on('connect', function(socket){
    socket.on('myPeer', function(opt){
    	console.log('myPeer');
	 var signal = opt.signal,
            room = opt.room;

        if(signal && socket && room){
            addAndConnectClient(signal, socket, room);
        }
    });
});

var clients = {};
var addAndConnectClient = function(signal, socket, room){
    if(clients[room]){
        // Oh there already is at least one client

        if(Object.keys(clients[room]).length > 2){
            // We do not connect more then two users
            console.log('already got 2 clients'); //TODO inform client
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

    if(Object.keys(clients[room]).length == 2){
        // Yay, we got both

        console.log('both')
        //clients[room][1].socket.emit('signal', clients[room][0].signal);
    }
};
