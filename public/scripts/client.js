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
                    var peer = new Peer({initiator: initiator, stream: stream});

                    // After connection is build
                    peer.on('stream', function (stream) {
                        console.log(stream);
                        //https://github.com/feross/lxjs-chat/blob/master/public/js/index.js#L100
                        //https://github.com/feross/lxjs-chat/blob/master/public/js/peer.js#L126
                        var video = document.querySelector('video');
                        video.src = window.URL.createObjectURL(stream);
                        video.play();
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
