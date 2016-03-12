define(['io', 'Peer'], function(io, Peer){
    return {
        run: function(opt){
            opt = opt || {};

            var room = opt.room,
                initiator = opt.initiator;


            if (!navigator.getUserMedia)
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

            navigator.getUserMedia({ audio: false, video: true },
                function(stream){
                    var peer = new Peer({initiator: initiator, stream: stream});

                    var socket = io('http://localhost:3001'); //TODO => config

                    socket.on('signal', function(data) {
                        console.log('signal via socket');
                    });

                    peer.on('signal', function(data) {
                        socket.emit('myPeer', {room: room, signal: data});
                    });
                },
                function(e) {
                    console.log(e);
                }
            );
        }
    };
});