#!/bin/bash
npm install --prefix ./public/scripts/vendor/bower/simple-peer
browserify public/scripts/vendor/bower/simple-peer/index.js -s umd-version > public/scripts/vendor/bower/simple-peer/umd-version.js