'use strict';

const config = require('../config/config');
const SymbolCalculator = require('../models/symbolCalculator');
const clear = require('clear');
const Stream = require('twitter-public-stream');

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

let isStreamOn = false;

const stream = new Stream({
    /* jshint ignore:start */
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret,
    access_token_key: config.twitter.access_token_key,
    access_token_secret: config.twitter.access_token_secret,
	track: config.twitter.track
    /* jshint ignore:end */
});

const startStream = (stream) => {
    stream.stream();
};

const stopStream = (stream) => {
    stream.destroy();
};

const symbolCalculator = new SymbolCalculator();
let symbolCounter = symbolCalculator.symbolCounter();
stream.on('data', (json) => {
    symbolCounter = symbolCounter(json.text);
    const usedSymbols = symbolCalculator.getUsedSymbols();
    const nrOfTweetsCounted = symbolCalculator.getNumberOfTweetsCalculated();

    myEmitter.emit('symbols', {
        symbols: usedSymbols,
        nrOfTweets: nrOfTweetsCounted
    });
});

stream.on('connected', () => {
    isStreamOn = true;
});

stream.on('close', () => {
    isStreamOn = false;
});

stream.on('error', (e) => {
    console.log('Oups error', e);
    try {
        stopStream(stream);
    } catch (e) {

    }
});

const doStream = (clients, onlyStop = false) => {
    try {
        if(clients === 0){
            stopStream(stream);
        }else if(clients > 0 && !isStreamOn && !onlyStop){
            startStream(stream);
        }
    } catch (e) {
        console.log('Oups an error: ', e);
    }
};

module.exports = (socket, io) => {

    myEmitter.on('symbols', (data) => {
        doStream(io.engine.clientsCount);
        socket.emit('symbol update', data);
    });

    socket.on('disconnect', function() {
        console.log('Got disconnect!');
        doStream(io.engine.clientsCount);
    });

    socket.on('startStream', () => {
        doStream(io.engine.clientsCount);
    });

    socket.on('endStream', () => {
        doStream(io.engine.clientsCount, true);
        socket.disconnect(0);
    });
};
