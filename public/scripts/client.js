define(['io', 'Peer', 'config', 'jquery'], function (io, Peer, config, $) {
    return {
        run: function (opt) {
            opt = opt || {};

            var room = opt.room,
                initiator = opt.initiator;


            if (!navigator.getUserMedia)
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

            navigator.getUserMedia({audio: false, video: true},
                function (stream) {
                    //TODO do i need STUN or whatever server? http://www.html5rocks.com/en/tutorials/webrtc/infrastructure/
                    console.log(stream);
                    var peer = new Peer({initiator: initiator, stream: stream});

                    // Show me
                    var videoMe = $('video#me')[0];
                    videoMe.src = window.URL.createObjectURL(stream);
                    videoMe.play();

                    // After connection is build
                    peer.on('stream', function (stream) {
                        console.log(stream);
                        var videoHi = $('video#hi')[0];
                        videoHi.src = window.URL.createObjectURL(stream);
                        videoHi.play();
                    });

                    // Build connection
                    var socket = io(config.socket.url); //TODO => config

                    socket.on('signal', function (signal) {
                        peer.signal(signal);
                    });

                    if(initiator)
                        peer.on('signal', function (data) {
                            socket.emit('register', {room: room, signal: data});
                        });
                    else
                        socket.emit('register', {room: room});
                },
                function (e) {
                    console.log(e);
                }
            );
        }
    };
});
