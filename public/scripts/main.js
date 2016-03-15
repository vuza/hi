require.config({
    baseUrl: '/scripts/',
    paths: {
        io: 'vendor/bower/socket.io-client/socket.io',
        Peer: 'vendor/bower/simple-peer/umd-version',
        jquery: 'vendor/bower/jquery/dist/jquery'
    },
    deps: ['client', 'helper'],
    callback: function (client, helper) {
        var room = helper.getUrlParam('id'),
            initiator = false;

        if(!room) {
            room = helper.createRoom();
            initiator = true;
        }

        client.run({initiator: initiator, room: room});
    }
});