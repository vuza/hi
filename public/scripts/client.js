define(['io', 'P2P'], function(io, P2P){
    return {
        run: function(){
            var socket = io(); //TODO set server address
            var p2p = new P2P(socket);

            p2p.on('peer-msg', function (data) {
                console.log('From a peer %s', data);
            });
        }
    };
});