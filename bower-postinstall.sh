#!/bin/bash
npm install --prefix ./public/scripts/vendor/bower/socket.io-p2p
browserify public/scripts/vendor/bower/socket.io-p2p/index.js -s umd-version > public/scripts/vendor/bower/socket.io-p2p/umd-version.js