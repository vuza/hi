require.config({
    baseUrl: '/scripts/',
    paths: {
        io: 'vendor/bower/socket.io-client/socket.io',
        P2P: 'vendor/socket.io-p2p.umd-export.js'
    },
    deps: ['client'],
    callback: function (client) {
        client.run();
    }
});