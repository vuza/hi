var express = require('express'),
    https = require('https'),
    http = require('http'),
    fs = require('fs'),
    config = require('./config'),
    app = express();

var u1 = {},
    u2 = {};

var server;
if(config.tls.on) {
    var credentials = {
        key: fs.readFileSync(config.tls.paths.key, 'utf8'),
        cert: fs.readFileSync(config.tls.paths.cert, 'utf8')
    };
    server = https.createServer(credentials, app);
} else{
    server = http.createServer(app);
}

server.listen(3000); //TODO config

var io = require('socket.io')(server);

io.on('connect', function (socket) {
    socket.on('register', function(opt){
        var room = opt.room,
            signal = opt.signal || null;

        if(socket && room){
            addAndConnectClient(socket, room, signal);
        }
    });
});

var clients = {};
var addAndConnectClient = function (socket, room, signal) {
    if (clients[room]) {
        // Oh there already is at least one client

        if (Object.keys(clients[room]).length > 2) {
            // We do not connect more then two users
            console.log('already got 2 clients'); //TODO inform client
            return;
        }

        if (!clients[room][socket.id]) {
            // There already is the first, but not the second client, add it
            clients[room][socket.id] = {socket: socket, signal: signal};
        }
    } else {
        clients[room] = {};
        clients[room][socket.id] = {socket: socket, signal: signal};
    }

    if (Object.keys(clients[room]).length == 2) {
        // Yay, we got both

        for(var key in clients[room]){
            if(key != socket.id)
                clients[room][socket.id].socket.emit('signal', clients[room][key]['signal']);
        }
    }
};
