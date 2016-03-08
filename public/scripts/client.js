define(['io', 'P2P'], function(io, P2P){
    return {
        run: function(){
            var socket = io('http://localhost:3001'); //TODO => config
            var p2p = new P2P(socket, {}, function(){
                p2p.emit('peer-msg', 'HI');
            });

            p2p.on('peer-msg', function (data) {
                console.log('From a peer %s', data);
            });
        }
    };
});