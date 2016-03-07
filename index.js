//Tutorial: http://socket.io/blog/socket-io-p2p/

var express = require('express'),
    io = require('socket.io')(3001), //TODO => config
    p2p = require('socket.io-p2p-server').Server,
    app = express();

io.use(p2p);

app.listen(3000); //TODO => config