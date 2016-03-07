require.config({
    baseUrl: '/scripts/',
    paths: {
        io: 'vendor/bower/socket.io-client/socket.io',
        P2P: 'vendor/bower/socket.io-p2p/umd-version'
    },
    deps: ['client'],
    callback: function (client) {
        client.run();
    }
});